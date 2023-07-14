import {
  useDefaultSlot,
  useDraggableData,
  useResizableData,
  useSceneContext,
} from '../hooks'
import type { ExtractPropTypes, PropType } from 'vue-demi'
import { computed, defineComponent, h, reactive, ref } from 'vue-demi'
import type { CoreFnCallback } from './freeDomCore'
import FreeDomCore from './freeDomCore'
import type { ResizeData } from './resizeDomCore'
import ResizeDomCore, { resizeDomCoreProps } from './resizeDomCore'

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
  handler: resizeDomCoreProps.handler,
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
  setup(props, { emit }) {
    const deltaX = ref(0)
    const deltaY = ref(0)
    const dragData = ref()
    const domRef = ref<InstanceType<typeof FreeDomCore>>()

    const { slots: children } = useDefaultSlot()
    const { x, y, create } = useDraggableData(props)
    const { width, height } = useResizableData(props, domRef)

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

    const sceneContext = useSceneContext(context)

    const style = computed(() => ({
      position: 'absolute',
      width: `${width.value}px`,
      height: `${height.value}px`,
      transform: `translate(${x.value}px, ${y.value}px)`,
    }))

    const onDrag: CoreFnCallback = (evt, coreData) => {
      const data = dragData.value = create(coreData)
      const isValid = sceneContext.check?.({ x: data.x, y: data.y, width: width.value, height: height.value })
      if (!isValid) return
      x.value = data.x
      y.value = data.y
      deltaX.value = data.deltaX
      deltaY.value = data.deltaY

      props.dargFn(evt, data)
      sceneContext?.emit('move')
    }
    const onDragStop: CoreFnCallback = (evt, coreData) => {
      const data = dragData.value = create(coreData)

      props.dragStopFn(evt, data)
      sceneContext?.emit('moveup')

      emit('update:x', x.value)
      emit('update:y', y.value)
      emit('update:modelValue', { x: x.value, y: y.value, w: width.value, h: height.value })
    }

    const onResize: ResizeFnCallback = (evt, { node, width: w, height: h, handle: axis }) => {
      const offsetW = -(w - width.value)
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
      emit('update:width', width.value)
      emit('update:height', height.value)
      emit('update:modelValue', { x: x.value, y: y.value, w: width.value, h: height.value })
    }

    return {
      domRef,
      children,
      style,
      w: width,
      h: height,
      onDrag,
      onDragStop,
      onResize,
      onResizeStop,
    }
  },
  render() {
    // 必须是在这里改为匿名函数，如果在下面会导致w和h的值在创建resizeNode时确定
    // 表现出来就是props的值在resizeBox内部一直保持初始值不变
    const resizeNode = () => h(ResizeDomCore, {
      width: this.w,
      height: this.h,
      lockAspectRatio: this.lockAspectRatio,
      resizeFn: this.onResize,
      stopFn: this.onResizeStop,
    }, {
      default: () => this.children,
      handler: this.$slots.handler,
    })
    return h(FreeDomCore, {
      ref: 'domRef',
      class: 'vv-free-dom--draggable',
      style: this.style,
      stopFn: this.onDragStop,
      dragFn: this.onDrag,
    }, resizeNode)
  },
})

export default freeDom
