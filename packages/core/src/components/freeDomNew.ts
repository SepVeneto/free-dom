import { useDefaultSlot, useDraggableData } from '../hooks'
import type { PropType } from 'vue'
import { computed, defineComponent, h, ref } from 'vue'
import type { CoreFnCallback } from './freeDomCore'
import FreeDomCore from './freeDomCore'
import type { ResizeData } from './resizeDomCore'
import ResizeDomCore from './resizeDomCore'

function noop() { /* noop */ }

type ResizeFnCallback = (evt: MouseEvent, resizeData: Omit<ResizeData, 'handle'>) => void

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

    const style = computed(() => {
      return {
        width: `${width.value}px`,
        height: `${height.value}px`,
        transform: `translate(${x.value}px, ${y.value}px)`,
      }
    })

    const onDrag: CoreFnCallback = (evt, coreData) => {
      const dragData = create(coreData)
      x.value = dragData.x
      y.value = dragData.y

      props.dargFn(evt, dragData)
    }
    const onDragStop: CoreFnCallback = (evt, coreData) => {
      const dragData = create(coreData)

      props.dragStopFn(evt, dragData)
    }

    const onResize: ResizeFnCallback = (evt, { node, width: w, height: h }) => {
      width.value = w
      height.value = h

      props.resizeFn(evt, { node, width: w, height: h })
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
