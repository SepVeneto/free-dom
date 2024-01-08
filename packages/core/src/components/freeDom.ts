import {
  useDraggableData,
  useEventBus,
  useResizableData,
  useSceneContext,
} from '../hooks'
import type { ExtractPropTypes, PropType } from 'vue-demi'
import { computed, defineComponent, isVue2, onMounted, reactive, ref } from 'vue-demi'
import type { CoreFnCallback } from './freeDomCore'
import FreeDomCore from './freeDomCore'
import type { ResizeData } from './resizeDomCore'
import ResizeDomCore, { resizeDomCoreProps } from './resizeDomCore'
import { clamp, createRender } from '../util'
import { onClickOutside } from '@vueuse/core'

function noop() { /* noop */ }

type ResizeFnCallback = (evt: MouseEvent, resizeData: ResizeData) => void

export const freeDomProps = {
  modelValue: {
    type: Object as PropType<Partial<{ x: number, y: number, w: number, h: number }>>,
    default: () => ({}),
  },
  keyboard: Boolean,
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
  width: {
    type: Number,
    default: undefined,
  },
  height: {
    type: Number,
    default: undefined,
  },
  handle: {
    type: String,
    default: undefined,
  },
  lockAspectRatio: Boolean,
  dragStartFn: {
    type: Function as PropType<CoreFnCallback>,
    default: noop,
  },
  dragStopFn: {
    type: Function as PropType<CoreFnCallback>,
    default: noop,
  },
  dragFn: {
    type: Function as PropType<CoreFnCallback>,
    default: noop,
  },
  resizeStartFn: {
    type: Function as PropType<ResizeFnCallback>,
    default: noop,
  },
  resizeFn: {
    type: Function as PropType<ResizeFnCallback>,
    default: noop,
  },
  resizeStopFn: {
    type: Function as PropType<ResizeFnCallback>,
    default: noop,
  },
  autoSize: {
    type: Boolean,
    default: true,
  },
  minWidth: resizeDomCoreProps.minWidth,
  minHeight: resizeDomCoreProps.minHeight,
  disabledDrag: Boolean,
  disabledResize: Boolean,
  scale: resizeDomCoreProps.scale,
  transformScale: {
    type: Number,
    default: 1,
  },
  fixNonMonospaced: Boolean,
}
export type FreeDomProps = ExtractPropTypes<typeof freeDomProps>

const freeDom = defineComponent({
  name: 'FreeDom',
  props: freeDomProps,
  emits: [
    'update:width',
    'update:height',
    'update:x',
    'update:y',
    'update:modelValue',
  ],
  setup(props, { emit, expose, slots }) {
    const domRef = ref<InstanceType<typeof FreeDomCore>>()
    const isBatchSelecting = ref(false)
    const eventBus = useEventBus()
    eventBus.on('batch-select', (state: 'start' | 'end') => {
      isBatchSelecting.value = state === 'start'
    })

    const {
      x,
      y,
      deltaX,
      deltaY,
      create,
      handleDragStart,
      handleDrag,
      handleDragStop,
    } = useDraggableData(props)
    const { width, height, syncSize: _syncSize } = useResizableData(props, domRef)
    const selected = ref(false)

    const context = {
      selected,
      _rect: reactive({
        x,
        y,
        width,
        height,
        deltaX,
        deltaY,
      }),
      trigger: (pos: any) => {
        emit('update:modelValue', pos)
      },
    }

    const sceneContext = useSceneContext(context, reactive(props))
    onClickOutside(domRef, () => {
      if (!selected.value || isBatchSelecting.value) return
      selected.value = false
    })
    const syncSize = () => {
      _syncSize(
        sceneContext.fixNonMonospaced.value,
        sceneContext.minWidth.value,
        sceneContext.minHeight.value,
      )
    }
    const canDrag = ref(false)

    onMounted(() => {
      props.autoSize && syncSize()
      // @ts-expect-error: trigger after mounted
      const pos = sceneContext.correct(context._rect)
      context.trigger({ x: pos.x, y: pos.y, w: pos.width, h: pos.height })
    })

    const style = computed(() => ({
      width: `${width.value}px`,
      height: `${height.value}px`,
      transform: `translate(${x.value}px, ${y.value}px)`,
    }))

    const onDrag: CoreFnCallback = (evt, coreData) => {
      if (!canDrag.value) return
      const data = create(coreData)
      const newPos = {
        x: data.x,
        y: data.y,
        width: width.value,
        height: height.value,
      }
      const isValid = sceneContext.check?.(newPos)
      if (!isValid) return

      handleDrag(evt, data)
      sceneContext.emit('move', evt.shiftKey)
    }
    const onDragStop: CoreFnCallback = (evt, coreData) => {
      if (!canDrag.value) return
      const newPos = {
        x: x.value,
        y: y.value,
        width: width.value,
        height: height.value,
      }
      const isValid = sceneContext.check?.(newPos)
      if (!isValid) {
        x.value = clamp(x.value, 0, sceneContext.width)
        y.value = clamp(y.value, 0, sceneContext.height)
      }

      handleDragStop(evt, coreData)

      sceneContext.emit('moveup')

      emit('update:x', x.value)
      emit('update:y', y.value)
      emit('update:modelValue', { x: x.value, y: y.value, w: width.value, h: height.value })
      sceneContext.history?.push({ type: 'move-end' })
    }
    const onDragStart: CoreFnCallback = (evt, coreData) => {
      const handle = sceneContext.handle.value
      if (handle) {
        if (handle.startsWith('.')) {
          canDrag.value = (evt.target as HTMLElement)!.classList.contains(handle.slice(1))
        } else if (handle.startsWith('#')) {
          canDrag.value = (evt.target as HTMLElement)!.id === handle.slice(1)
        } else {
          console.warn(`[free-dom] can not find element with ${handle}`)
          canDrag.value = true
        }
      } else {
        canDrag.value = true
      }
      canDrag.value && handleDragStart(evt, coreData)
    }

    const onResize: ResizeFnCallback = (evt, { node, width: w, height: h, handle: axis }) => {
      // @ts-expect-error: execute after mounted
      const offsetW = -(w - width.value)
      // @ts-expect-error: execute after mounted
      const offsetH = -(h - height.value)

      const axisH = axis[0]
      const axisV = axis[axis.length - 1]

      let _x = x.value
      let _y = y.value
      // 补偿向上或左缩放时原点的位置
      if (axisH === 'l') {
        _x += offsetW
      }
      if (axisV === 't') {
        _y += offsetH
      }

      const isValid = sceneContext.check?.({ x: _x, y: _y, width: w, height: h })
      if (!isValid) return

      width.value = w
      height.value = h
      x.value = _x
      y.value = _y

      props.resizeFn(evt, { node, width: w, height: h, handle: axis })
      sceneContext?.emit('move')
    }
    const onResizeStop: ResizeFnCallback = (evt, data) => {
      const isValid = sceneContext.check?.({ x: x.value, y: y.value, width: width.value, height: height.value })
      if (!isValid) {
        x.value = clamp(x.value, 0, sceneContext.width)
        y.value = clamp(y.value, 0, sceneContext.height)
      }

      props.resizeStopFn(evt, data)
      emit('update:width', width.value)
      emit('update:height', height.value)
      emit('update:modelValue', { x: x.value, y: y.value, w: width.value, h: height.value })
      sceneContext.emit('moveup')

      sceneContext.history?.push({ type: 'resize-end' })
    }
    const onResizeStart: ResizeFnCallback = (evt, data) => {
      props.resizeStartFn(evt, data)
    }
    const resizeNode = () => {
      const props = {
        width: width.value,
        height: height.value,
        lockAspectRatio: sceneContext.lockAspectRatio.value,
        dragOpts: {
          disabled: sceneContext.disabledResize.value,
          scale: sceneContext.transformScale.value,
        },
        startFn: onResizeStart,
        resizeFn: onResize,
        stopFn: onResizeStop,
        minHeight: sceneContext.minHeight.value,
        minWidth: sceneContext.minWidth.value,
        scale: sceneContext.scale.value,
      }
      return createRender(ResizeDomCore, {}, props)(slots)
    }

    function handleSelect() {
      if (selected.value) return
      selected.value = true
      sceneContext.history?.push({ type: 'select' })
    }
    function handleKeyboard(evt: KeyboardEvent) {
      if (!canDrag.value || !sceneContext.keyboard.value) return
      evt.preventDefault()

      switch (evt.key) {
        case 'ArrowUp':
          y.value -= 1
          break
        case 'ArrowDown':
          y.value += 1
          break
        case 'ArrowLeft':
          x.value -= 1
          break
        case 'ArrowRight':
          x.value += 1
          break
      }
      const newPos = {
        x: x.value,
        y: y.value,
        width: width.value,
        height: height.value,
      }

      const isValid = sceneContext.check?.(newPos)
      if (!isValid) {
        x.value = clamp(x.value, 0, sceneContext.width)
        y.value = clamp(y.value, 0, sceneContext.height)
      }

      emit('update:x', x.value)
      emit('update:y', y.value)
      emit('update:modelValue', { x: x.value, y: y.value, w: width.value, h: height.value })
      // 为了显示参考线, 模拟鼠标移动
      sceneContext.emit('move', true)
    }

    expose?.({
      syncSize,
    })

    return {
      selected,
      domRef,
      style,
      onDragStop,
      onDrag,
      onDragStart,
      resizeNode,
      handleKeyboard,
      handleSelect,
      disabled: sceneContext.disabledDrag,
      scale: sceneContext.transformScale,
    }
  },
  render() {
    const props = {
      startFn: this.onDragStart,
      stopFn: this.onDragStop,
      dragFn: this.onDrag,
      disabled: this.disabled,
      scale: this.scale,
      keyboard: this.keyboard,
    }
    const vue2Listener = {
      on: {
        mousedown: this.handleSelect,
        keydown: this.handleKeyboard,
      },
    }
    const vue3Props = {
      ...props,
      onMousedown: this.handleSelect,
      onKeydown: this.handleKeyboard,
    }
    // 必须是在这里改为匿名函数，如果在下面会导致w和h的值在创建resizeNode时确定
    // 表现出来就是props的值在resizeBox内部一直保持初始值不变
    const slots = () => this.resizeNode()
    return createRender(
      FreeDomCore,
      {
        ref: 'domRef',
        tabindex: -1,
        class: [
          'vv-free-dom--draggable',
          this.disabled && 'vv-free-dom--draggable__disabled',
          this.selected && 'vv-free-dom--draggable__selected',
        ],
        style: this.style,
      },
      isVue2 ? props : vue3Props,
      isVue2 ? vue2Listener.on : {},
    )?.(slots)
  },
})

export default freeDom
