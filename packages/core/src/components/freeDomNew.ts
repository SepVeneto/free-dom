import { useDefaultSlot, useDraggableData, useSceneContext } from '../hooks'
import type { PropType } from 'vue'
import { computed, defineComponent, h, reactive, ref } from 'vue'
import type { CoreFnCallback } from './freeDomCore'
import FreeDomCore from './freeDomCore'
import type { ResizeData } from './resizeDomCore'
import ResizeDomCore from './resizeDomCore'

function noop() { /* noop */ }

type ResizeFnCallback = (evt: MouseEvent, resizeData: ResizeData) => void

const freeDom = defineComponent({
  name: 'FreeDom',
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
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
  },
  emits: ['update:width', 'update:height'],
  setup(props) {
    const { slots } = useDefaultSlot()
    const { x, y, create } = useDraggableData()
    const width = ref(props.width)
    const height = ref(props.height)
    const deltaX = ref(0)
    const deltaY = ref(0)
    const dragData = ref()

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
    }

    const onResize: ResizeFnCallback = (evt, { node, width: w, height: h, handle: axis }) => {
      const offsetW = -(w - width.value)
      const offsetH = -(h - height.value)

      const axisH = axis[0]
      const axisV = axis[axis.length - 1]

      width.value = w
      height.value = h

      // 补偿向上或左缩放时原点的位置
      if (axisH === 'l') {
        x.value += offsetW
      }
      if (axisV === 't') {
        y.value += offsetH
      }

      props.resizeFn(evt, { node, width: w, height: h, handle: axis })
      sceneContext?.emit('move')
    }

    return {
      slots,
      style,
      w: width,
      h: height,
      onDrag,
      onDragStop,
      onResize,
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
    }, () => this.slots)
    return h(FreeDomCore, {
      class: 'draggable',
      style: this.style,
      stopFn: this.onDragStop,
      dragFn: this.onDrag,
    }, resizeNode)
  },
})

export default freeDom
