import { computed, defineComponent, h, inject, ref } from 'vue'
import type { CoreFnCallback } from './freeDomCore'
import FreeDomCore from './freeDomCore'
import ResizeDomCore from './resizeDomCore'
import { useDefaultSlot } from '../hooks'
import type { ResizeFnCallback } from './resizeDomCore'
import { calcXY } from '../util'

import { gridLayoutContextKey } from './tokens'

export type GridItemInfo = {
  x: number
  y: number
  width: number
  height: number
}

const gridItemProps = {
  x: {
    type: Number,
    required: true as const,
  },
  y: {
    type: Number,
    required: true as const,
  },
  width: {
    type: Number,
    required: true as const,
  },
  height: {
    type: Number,
    required: true as const,
  },
  dragStartFn: {
    type: Function,
    default: function () { /* noop */ },
  },
  dragFn: {
    type: Function,
    default: function () { /* noop */ },
  },
  dragEndFn: {
    type: Function,
    default: function () { /* noop */ },
  },
}
const gridItemEmits = ['dragMove']

export const GridItem = defineComponent({
  name: 'GridItem',
  props: gridItemProps,
  emits: gridItemEmits,

  setup(props) {
    const { only, slots } = useDefaultSlot()
    const gridLayoutContext = inject(gridLayoutContextKey)
    if (!gridLayoutContext) {
      throw new Error('TODO')
    }
    const cellWidth = computed(() => gridLayoutContext.width / gridLayoutContext.cols)
    const x = computed(() => {
      if (!dragging.value) {
        return props.x * (cellWidth.value + gridLayoutContext.margin[0])
      } else {
        return dragging.value.x
      }
    })
    const y = computed(() => {
      if (!dragging.value) {
        return props.y * (props.height * gridLayoutContext.rowHeight + gridLayoutContext.margin[1])
      } else {
        return dragging.value.y
      }
    })
    const width = computed(() => props.width * cellWidth.value)
    const height = computed(() => gridLayoutContext.rowHeight * props.height)
    const style = computed(() => ({
      position: 'absolute',
      width: `${width.value}px`,
      height: `${height.value}px`,
      transform: `translate(${x.value}px, ${y.value}px)`,
    }))
    const dragging = ref<{ x: number, y: number }>()

    const onDragStart: CoreFnCallback = (evt, { x, y, node }) => {
      const parentRect = node.offsetParent!.getBoundingClientRect()
      const clientRect = node.getBoundingClientRect()

      dragging.value = {
        x: clientRect.left - parentRect.left + node.offsetParent!.scrollLeft,
        y: clientRect.top - parentRect.top + node.offsetParent!.scrollTop,
      }
    }
    const onDrag: CoreFnCallback = (evt, coreData) => {
      if (!dragging.value) {
        throw new Error('onDrag called before onDragStart')
      }
      const { deltaX, deltaY } = coreData
      const dragX = dragging.value.x + deltaX
      const dragY = dragging.value.y + deltaY

      dragging.value = { x: dragX, y: dragY }
      const { x, y } = calcXY(props, dragX, dragY, cellWidth.value, props.width, props.height)
      props.dragFn(evt, { x, y })
    }
    const onDragStop: CoreFnCallback = (evt, coreData) => {
      dragging.value = undefined
      const { x, y } = calcXY(props, coreData.x, coreData.y, cellWidth.value, props.width, props.height)
      props.dragEndFn(evt, { x, y })
    }

    const onResize: ResizeFnCallback = (evt, coreData) => {
      /* pass */
    }
    const onResizeStop: ResizeFnCallback = (evt, coreData) => {
      /* pass */
    }

    return {
      x,
      y,
      width,
      height,
      child: only,
      slots,
      style,
      onDragStart,
      onDrag,
      onDragStop,
      onResize,
      onResizeStop,
    }
  },
  render() {
    const resizeNode = () => h(ResizeDomCore, {
      width: this.width,
      height: this.height,
      resizeFn: this.onResize,
      stopFn: this.onResizeStop,
    }, () => this.slots)
    return h(FreeDomCore, {
      class: 'draggable',
      style: this.style,
      startFn: this.onDragStart,
      stopFn: this.onDragStop,
      dragFn: this.onDrag,
    }, resizeNode)
    // return h(FreeDom, {
    //   x: this.x,
    //   y: this.y,
    //   width: this.width,
    //   height: this.height,
    //   move: true,
    //   sync: false,
    //   onDragMove: (rect) => {
    //     this.$emit('dragMove', rect)
    //   },
    // }, () => this.slots)
  },
})
