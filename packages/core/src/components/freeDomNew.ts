import { useDefaultSlot, useDraggableData } from '../hooks'
import { computed, defineComponent, h, ref } from 'vue'
import type { CoreFnCallback } from './freeDomCore'
import FreedomCore from './freeDomCore'
import type { ResizeFnCallback } from './resizeBox'
import ResizeBox, { ResizeData } from './resizeBox'

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
  },
  emits: ['update:width', 'update:height'],
  setup(props, { emit }) {
    const { slots } = useDefaultSlot()
    const { x, y, create } = useDraggableData()
    const width = ref(props.width)
    const height = ref(props.height)

    const style = computed(() => {
      return {
        width: `${props.width}px`,
        height: `${props.height}px`,
        transform: `translate(${x.value}px, ${y.value}px)`,
      }
    })

    const onDrag: CoreFnCallback = (evt, coreData) => {
      const dragData = create(coreData)
      x.value = dragData.x
      y.value = dragData.y
    }
    const onDragStop: CoreFnCallback = (_evt, _coreData) => {
      /* pass */
    }

    const onResize: ResizeFnCallback = (evt, { width: w, height: h }) => {
      width.value = w
      height.value = h
      console.log(width.value, height.value)
      // emit('update:width', width)
      // emit('update:height', height)
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
    // console.log(this.children)
    const resizeNode = h(ResizeBox, {
      width: this.w,
      height: this.h,
      resizeFn: this.onResize,
    }, () => this.slots)
    return h(FreedomCore, {
      class: 'draggable',
      style: this.style,
      stopFn: this.onDragStop,
      dragFn: this.onDrag,
    }, () => resizeNode)
  },
})

export default freeDom
