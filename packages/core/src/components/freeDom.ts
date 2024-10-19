import {
  useDraggableData,
  useEventBus,
  useResizableData,
  useSceneContext,
} from '../hooks'
import type { ExtractPropTypes, PropType } from 'vue-demi'
import { computed, defineComponent, onMounted, reactive, ref, toRef, watch, watchEffect } from 'vue-demi'
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
  active: {
    type: Boolean,
    default: undefined,
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
  disabledSelect: Boolean,
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
    'select',
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

    watch(() => props.active, (val) => {
      if (typeof val === 'boolean') {
        selected.value = val
      }
    }, { immediate: true })
    watchEffect(() => {
      emit('select', selected.value)
    })

    const context = reactive({
      disabledSelect: toRef(props, 'disabledSelect'),
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
      props,
    })

    const sceneContext = useSceneContext(domRef, context, props)
    onClickOutside(domRef, () => {

      if (!selected.value || isBatchSelecting.value) return
      selected.value = false
    }, { ignore: [sceneContext.clearSelectState && '.vv-free-dom--draggable'] })
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
    })

    const style = computed(() => {
      return ({
        width: `${width.value}px`,
        height: `${height.value}px`,
        transform: `translate(${x.value}px, ${y.value}px)`,
      })
    })

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
      sceneContext.emit('move', sceneContext.manualDiff.value ? !evt.shiftKey : evt.shiftKey)
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

      width.value = Number(w.toFixed(2))
      height.value = Number(h.toFixed(2))
      x.value = Number(_x.toFixed(2))
      y.value = Number(_y.toFixed(2))

      props.resizeFn(evt, { node, width: w, height: h, handle: axis })
      sceneContext.emit('move', sceneContext.manualDiff.value ? !evt.shiftKey : evt.shiftKey)
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
      selected.value = true
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

    function handleSelect(evt: MouseEvent) {
      if (sceneContext.disabledSelect.value) return

      if (evt.ctrlKey) {
        selected.value = !selected.value
        sceneContext.history?.push({ type: 'select' })
      } else if (!selected.value) {
        sceneContext.clearSelectState?.()
        selected.value = true
        sceneContext.history?.push({ type: 'select' })
      }
    }
    function handleKeyboard(evt: KeyboardEvent) {
      if (sceneContext.disabledDrag.value || !sceneContext.keyboard.value) return
      evt.preventDefault()

      switch (evt.key) {
        case 'ArrowUp':
          deltaY.value = -1
          deltaX.value = 0
          break
        case 'ArrowDown':
          deltaY.value = 1
          deltaX.value = 0
          break
        case 'ArrowLeft':
          deltaX.value = -1
          deltaY.value = 0
          break
        case 'ArrowRight':
          deltaX.value = 1
          deltaY.value = 0
          break
        default:
          deltaX.value = 0
          deltaY.value = 0
      }

      x.value += deltaX.value
      y.value += deltaY.value
      const newPos = {
        x: x.value,
        y: y.value,
        width: width.value,
        height: height.value,
      }

      const isValid = sceneContext.check?.(newPos)
      if (!isValid) {
        x.value = clamp(x.value, 0, (sceneContext.width || 0) - (width.value || 0))
        y.value = clamp(y.value, 0, (sceneContext.height || 0) - (height.value || 0))
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
          (this.active || this.selected) && 'vv-free-dom--draggable__selected',
        ],
        style: this.style,
      },
      props,
      {
        nativeOnMousedown: this.handleSelect,
        nativeOnKeydown: this.handleKeyboard,
      },
    )?.(slots)
  },
})

export default freeDom
