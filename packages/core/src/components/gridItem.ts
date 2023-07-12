import type { ExtractPropTypes } from 'vue'
import { defineComponent, h, inject } from 'vue'
import FreeDomCore from './freeDomCore'
import ResizeDomCore from './resizeDomCore'
import { useDefaultSlot } from '../hooks'
import type { ResizeFnCallback } from './resizeDomCore'

import { gridLayoutContextKey } from './tokens'
import { useLayoutItem } from './useLayout'

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

export type GridItemProps = ExtractPropTypes<typeof gridItemProps>

export const GridItem = defineComponent({
  name: 'GridItem',
  props: gridItemProps,
  emits: gridItemEmits,

  setup(props) {
    const layout = inject(gridLayoutContextKey)
    if (!layout) {
      throw new Error('TODO')
    }

    const {
      x,
      y,
      width,
      height,
      dragging,
      style,

      onDragStart,
      onDrag,
      onDragStop,
    } = useLayoutItem(props, layout)
    const { only, slots } = useDefaultSlot()

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
      dragging,
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
      class: [this.dragging ? 'draggable' : '', 'grid-layout-item'],
      style: this.style,
      startFn: this.onDragStart,
      stopFn: this.onDragStop,
      dragFn: this.onDrag,
    }, resizeNode)
  },
})
