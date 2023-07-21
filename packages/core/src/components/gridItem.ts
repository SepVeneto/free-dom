import type { ExtractPropTypes, PropType, VNode } from 'vue-demi'
import { defineComponent, h, inject } from 'vue-demi'
import FreeDomCore from './freeDomCore'
import ResizeDomCore, { resizeDomCoreProps } from './resizeDomCore'
import { useDefaultSlot, useLayoutItem } from '../hooks'

import { gridLayoutContextKey } from './tokens'

export type GridItemInfo = {
  x: number
  y: number
  width: number
  height: number
}
type GridItemCallback = (evt: MouseEvent, data: { x: number, y: number }) => void
type GridItemResizeCallback = (evt: MouseEvent, data: { w: number, h: number }) => void
const noop = () => { /* noop */ }

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
    type: Function as PropType<GridItemCallback>,
    default: noop,
  },
  dragFn: {
    type: Function as PropType<GridItemCallback>,
    default: noop,
  },
  dragEndFn: {
    type: Function as PropType<GridItemCallback>,
    default: noop,
  },
  resizeStartFn: {
    type: Function as PropType<GridItemResizeCallback>,
    default: noop,
  },
  resizeFn: {
    type: Function as PropType<GridItemResizeCallback>,
    default: noop,
  },
  resizeStopFn: {
    type: Function as PropType<GridItemResizeCallback>,
    default: noop,
  },
  isDraggable: Boolean,
  isResizable: Boolean,
  scale: {
    type: resizeDomCoreProps.scale.type,
    default: () => (['rb']),
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
      minWidth,
      minHeight,

      onDragStart,
      onDrag,
      onDragStop,
      onResizeStart,
      onResize,
      onResizeStop,
    } = useLayoutItem(props, layout)
    const { only, slots } = useDefaultSlot()

    const resizeNode = (child?: VNode[] | VNode) => {
      return h(ResizeDomCore, {
        // DEV: vue2 vue3
        props: {
          width: width.value,
          height: height.value,
          scale: props.scale,
          dragOpts: {
            disabled: !props.isResizable,
          },
          minWidth: minWidth.value,
          minHeight: minHeight.value,
          startFn: onResizeStart,
          resizeFn: onResize,
          stopFn: onResizeStop,
        },
      }, [child])
    }
    const dragNode = (child?: VNode[] | VNode) => h(FreeDomCore, {
      class: [
        dragging.value && 'vv-grid-layout--item__draggable',
        'vv-grid-layout--item',
        !props.isDraggable && 'vv-grid-layout--item__disabled',
      ],
      style: style.value,
      // DEV: vue2 vue3
      props: {
        disabled: !props.isDraggable,
        startFn: onDragStart,
        stopFn: onDragStop,
        dragFn: onDrag,
      },
    }, [() => resizeNode(child)])

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
      onResizeStart,
      onResize,
      onResizeStop,
      dragNode,
    }
  },
  render() {
    const node: VNode[] | VNode | undefined = this.slots

    return this.dragNode(node)
  },
})
