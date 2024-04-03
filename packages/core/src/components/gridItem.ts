import type { ExtractPropTypes, PropType, VNode } from 'vue-demi'
import { defineComponent, inject, onMounted, ref, watch } from 'vue-demi'
import FreeDomCore from './freeDomCore'
import ResizeDomCore, { resizeDomCoreProps } from './resizeDomCore'
import { useDefaultSlot, useLayoutItem } from '../hooks'

import { gridLayoutContextKey } from './tokens'
import { createRender } from '../util'

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
  droppingPosition: {
    type: Object,
    default: undefined,
  },
}
const gridItemEmits = ['dragMove']

export type GridItemProps = ExtractPropTypes<typeof gridItemProps>

export const GridItem = defineComponent({
  name: 'GridItem',
  props: gridItemProps,
  emits: gridItemEmits,

  setup(props) {
    const nodeRef = ref<InstanceType<typeof FreeDomCore>>()
    const layout = inject(gridLayoutContextKey)
    if (!layout) {
      throw new Error('TODO')
    }

    onMounted(() => {
      moveDroppingItem()
    })

    watch(() => props.droppingPosition, (currPos, prevPos) => {
      moveDroppingItem(prevPos)
    }, { deep: true })

    function moveDroppingItem(prevPos?: any) {
      if (!props.droppingPosition) return

      const node: HTMLElement = nodeRef.value?.$el
      if (!node) return

      const prevPosition = prevPos || { left: 0, top: 0 }
      const shouldDrag =
        (dragging.value && props.droppingPosition.left !== prevPosition.left) ||
        props.droppingPosition.top !== prevPosition.top

      if (!dragging.value) {
        onDragStart(props.droppingPosition.evt, {
          node,
          deltaX: props.droppingPosition.left as number,
          deltaY: props.droppingPosition.top as number,
          x: 0,
          y: 0,
          lastX: 0,
          lastY: 0,
        })
      } else if (shouldDrag) {
        const deltaX = props.droppingPosition.left - prevPosition.left
        const deltaY = props.droppingPosition.top - prevPosition.top

        onDrag(props.droppingPosition.evt, {
          node,
          deltaX,
          deltaY,
          x: 0,
          y: 0,
          lastX: 0,
          lastY: 0,
        })
      }
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
    const resizeNode = (child?: VNode[] | VNode) => {
      const _props = {
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
      }
      return createRender(ResizeDomCore, {}, _props)(() => child)
    }
    const dragNode = (child?: VNode[] | VNode) => {
      const _attrs = {
        class: [
          dragging.value && 'vv-grid-layout--item__draggable',
          'vv-grid-layout--item',
          !props.isDraggable && 'vv-grid-layout--item__disabled',
        ],
        style: style.value,
        ref: nodeRef,
      }
      const _props = {
        disabled: !props.isDraggable,
        startFn: onDragStart,
        stopFn: onDragStop,
        dragFn: onDrag,
      }
      return createRender(FreeDomCore, _attrs, _props)(() => resizeNode(child))
    }

    return {
      x,
      y,
      width,
      height,
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
    const { slots } = useDefaultSlot()
    const node: VNode[] | VNode | undefined = slots

    return this.dragNode(node)
  },
})
