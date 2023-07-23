import {
  useDefaultSlot,
  useDraggableData,
  useResizableData,
  useSceneContext,
} from '../hooks'
import type { ExtractPropTypes, PropType } from 'vue-demi'
import { computed, defineComponent, onMounted, reactive, ref } from 'vue-demi'
import type { CoreFnCallback } from './freeDomCore'
import FreeDomCore from './freeDomCore'
import type { ResizeData } from './resizeDomCore'
import ResizeDomCore, { resizeDomCoreProps } from './resizeDomCore'
import { clamp, createRender } from '../util'

function noop() { /* noop */ }

type ResizeFnCallback = (evt: MouseEvent, resizeData: ResizeData) => void

export const freeDomProps = {
  modelValue: {
    type: Object as PropType<Partial<{ x: number, y: number, w: number, h: number }>>,
    default: () => ({}),
  },
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
  lockAspectRatio: Boolean,
  dragStartFn: {
    type: Function as PropType<CoreFnCallback>,
    default: noop,
  },
  dragStopFn: {
    type: Function as PropType<CoreFnCallback>,
    default: noop,
  },
  dargFn: {
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

    const { slots: children } = useDefaultSlot()
    const {
      x,
      y,
      deltaX,
      deltaY,
      create,
      handleDrag,
      handleDragStop,
    } = useDraggableData(props)
    const { width, height, syncSize: _syncSize } = useResizableData(props, domRef)

    const context = {
      _rect: reactive({
        x,
        y,
        width,
        height,
        deltaX,
        deltaY,
      }),
      trigger: () => { /* TODO */ },
    }

    const sceneContext = useSceneContext(context, props)
    const syncSize = () => {
      _syncSize(
        sceneContext.fixNonMonospaced.value,
        sceneContext.minWidth.value,
        sceneContext.minHeight.value,
      )
    }

    onMounted(() => {
      props.autoSize && syncSize()
    })

    const style = computed(() => ({
      position: 'absolute',
      width: `${width.value}px`,
      height: `${height.value}px`,
      transform: `translate(${x.value}px, ${y.value}px)`,
    }))

    const onDrag: CoreFnCallback = (evt, coreData) => {
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
      sceneContext.emit('move')
    }
    const onDragStop: CoreFnCallback = (evt, coreData) => {
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
    const onResizeStop: ResizeFnCallback = () => {
      const isValid = sceneContext.check?.({ x: x.value, y: y.value, width: width.value, height: height.value })
      if (!isValid) {
        x.value = clamp(x.value, 0, sceneContext.width)
        y.value = clamp(y.value, 0, sceneContext.height)
      }

      emit('update:width', width.value)
      emit('update:height', height.value)
      emit('update:modelValue', { x: x.value, y: y.value, w: width.value, h: height.value })
      sceneContext.emit('moveup')
    }
    const resizeNode = () => {
      const props = {
        width: width.value,
        height: height.value,
        lockAspectRatio: sceneContext.lockAspectRatio.value,
        dragOpts: { disabled: sceneContext.disabledResize.value },
        resizeFn: onResize,
        stopFn: onResizeStop,
        minHeight: sceneContext.minHeight.value,
        minWidth: sceneContext.minWidth.value,
        scale: sceneContext.scale.value,
      }
      const _slots = {
        default: () => {
          return children.value
        },
        handler: slots.handler,
      }
      return createRender(ResizeDomCore, {}, props)(_slots)
    }

    expose?.({
      syncSize,
    })

    return {
      domRef,
      style,
      onDragStop,
      onDrag,
      resizeNode,
      disabled: sceneContext.disabledDrag,
    }
  },
  render() {
    const props = {
      stopFn: this.onDragStop,
      dragFn: this.onDrag,
      disabled: this.disabled,
    }
    // 必须是在这里改为匿名函数，如果在下面会导致w和h的值在创建resizeNode时确定
    // 表现出来就是props的值在resizeBox内部一直保持初始值不变
    const slots = () => this.resizeNode()
    return createRender(
      FreeDomCore,
      {
        ref: (el: any) => { this.domRef = el },
        class: 'vv-free-dom--draggable',
        style: this.style,
      },
      props,
    )(slots)
  },
})

export default freeDom
