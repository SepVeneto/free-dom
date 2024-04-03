import type { ExtractPropTypes, PropType, VNode } from 'vue-demi'
import { Fragment, defineComponent, h, provide, reactive, ref, toRefs } from 'vue-demi'
import { GridItem } from './gridItem'
import type { GridItemInfo } from './gridItem'
import { gridLayoutContextKey } from './tokens'
import { useLayout } from '../hooks'
import type { ResizeDomCoreProps } from './resizeDomCore'
import { createRender } from '../util'
import { useDroppingItem } from '../hooks/use-droppingitem'

export type GridLayoutItem = {
  i: string | number
  x: number
  y: number
  w: number
  h: number
  moved?: boolean
  static?: boolean
  scale?: ResizeDomCoreProps['scale']
}
export type GridLayoutConfig = GridLayoutItem[]
export type GridLayoutKey = string | number | symbol

const gridLayoutProps = {
  droppable: Boolean,
  droppingItem: {
    type: Object,
    default: () => ({
      i: '__dropping-elem__',
      w: 1,
      h: 1,
    }),
  },
  modelValue: {
    type: Array as PropType<GridLayoutConfig>,
    required: true,
    default: () => ([]),
  },
  autoHeight: {
    type: Boolean,
    default: true,
  },
  cols: {
    type: Number,
    default: 12,
  },
  maxRows: {
    type: Number,
    default: Infinity,
  },
  minW: {
    type: Number,
    default: 1,
  },
  minH: {
    type: Number,
    default: 1,
  },
  rowHeight: {
    type: Number,
    default: 150,
  },
  width: {
    type: Number,
    default: 1200,
  },
  margin: {
    type: Array as PropType<number[]>,
    default: () => ([10, 10]),
  },
  containerPadding: {
    type: Array as PropType<number[]>,
    default: undefined,
  },
  disabledDrag: Boolean,
  disabledResize: Boolean,
  collision: Boolean,
}
export type GridLayoutProps = ExtractPropTypes<typeof gridLayoutProps>

const GridLayout = defineComponent({
  name: 'GridLayout',
  inheritAttrs: false,
  props: gridLayoutProps,
  emits: ['update:modelValue', 'dropItem'],

  setup(props, { emit }) {
    const layout = useLayout(reactive(toRefs(props)))
    const droppingItem = useDroppingItem(layout, props)

    provide(gridLayoutContextKey, layout)

    const activeDrag = ref<GridItemInfo | null>(null)

    function processItem(node: VNode, isDroppingItem = false) {
      const key = node.key
      if (!key) return
      const config = layout.getItem(String(key))
      if (!config) return
      const isDraggable = !config.static && !props.disabledDrag
      const isResizable = !config.static && !props.disabledResize
      const _props = {
        x: config.x,
        y: config.y,
        width: config.w,
        height: config.h,
        isDraggable,
        isResizable,
        scale: config.scale,
        droppingPosition: isDroppingItem ? droppingItem.position.value : undefined,
        dragEndFn: (evt: any, rect: any) => {
          const { x, y } = rect
          const _layout = layout.moveTo(config, x, y)
          emit('update:modelValue', _layout)
          activeDrag.value = null
        },
        dragStartFn: () => {
          /** pass */
        },
        dragFn: (evt: any, data: any) => {
          if (!config) return
          const placeholder = {
            x: config.x,
            y: config.y,
            width: config.w,
            height: config.h,
          }
          const { x, y } = data
          layout.moveTo(config, x, y)

          activeDrag.value = placeholder
        },
        resizeFn: (evt: any, data: any) => {
          const placeholder = {
            x: config.x,
            y: config.y,
            width: config.w,
            height: config.h,
          }

          activeDrag.value = placeholder
          const { w, h } = data
          layout.resizeTo(config, w, h)
        },
        resizeStopFn: (evt: any, data: any) => {
          const { w, h } = data
          const _layout = layout.resizeTo(config, w, h)
          emit('update:modelValue', _layout)
          activeDrag.value = null
        },
      }
      return createRender(GridItem, {}, _props)({ default: () => node })
    }

    function placeholder() {
      if (!activeDrag.value) return null
      const { x, y, width, height } = activeDrag.value
      const _props = {
        x,
        y,
        width,
        height,
        move: false,
      }
      return createRender(GridItem, {
        class: 'vv-grid-layout--placeholder',
      }, _props)()
    }
    function removeDroppingPlaceholder() {
      const _layout = layout.getFull()
      const newLayout = layout.normalize(_layout.filter(l => l.i !== props.droppingItem.i))
      layout.setFull(newLayout)
    }
    let dragEnterCount = 0
    function onDrop(evt: DragEvent) {
      evt.stopPropagation()
      evt.preventDefault()

      const item = layout.getItem(props.droppingItem.i)

      removeDroppingPlaceholder()

      droppingItem.droppingNode.value = null
      droppingItem.position.value = null
      activeDrag.value = null

      dragEnterCount = 0

      emit('dropItem', item)
    }
    function onDragLeave(evt: DragEvent) {
      evt.stopPropagation()
      evt.preventDefault()

      --dragEnterCount

      if (dragEnterCount === 0) {
        removeDroppingPlaceholder()
      }
    }
    function onDragEnter(evt: DragEvent) {
      evt.stopPropagation()
      evt.preventDefault()

      ++dragEnterCount
    }

    return {
      processItem,
      placeholder,
      onDrop,
      onDragLeave,
      onDragEnter,
      layout,
      droppingItem,
    }
  },

  render() {
    const mergedStyle = {
      ...(this.$attrs.style || {}),
      height: this.layout.calContainerHeight(),
    }
    const classes = Array.isArray(this.$attrs.class) ? this.$attrs.class : [this.$attrs.class]
    const mergedClass = [
      ...(classes || []),
      'vv-grid-layout',
    ]
    const defaultSlot =
      typeof this.$slots.default === 'function'
        ? this.$slots.default()
        : this.$slots.default ||
      []
    const slotList = flattenSlots(defaultSlot)
    return h('div', {
      class: mergedClass,
      style: mergedStyle,
      onDragover: this.droppable ? this.droppingItem.onDropover : noop,
      onDrop: this.droppable ? this.onDrop : noop,
      onDragleave: this.droppable ? this.onDragLeave : noop,
      onDragenter: this.droppable ? this.onDragEnter : noop,
    }, [
      slotList.map((slot) => {
        if (slot.type === Fragment) {
          this.processItem(slot)
        }
        return this.processItem(slot)
      }),
      this.droppable && this.droppingItem.droppingNode.value && this.processItem(this.droppingItem.droppingNode.value(), true),
      this.placeholder(),
    ])
  },
})

function noop() { /* pass */ }

function flattenSlots(slots: VNode[]) {
  const slotList: VNode[] = []

  slots.forEach(slot => {
    if (slot.type === Fragment && Array.isArray(slot.children)) {
      slotList.push(...flattenSlots(slot.children as VNode[]))
    } else {
      slotList.push(slot)
    }
  })

  return slotList
}

export default GridLayout
