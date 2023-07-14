import type { ExtractPropTypes, PropType, VNode } from 'vue-demi'
import { defineComponent, h, provide, ref } from 'vue-demi'
import { GridItem } from './gridItem'
import type { GridItemInfo } from './gridItem'
import { gridLayoutContextKey } from './tokens'
import { useLayout } from '../hooks'

export type GridLayoutItem = {
  i: string | number
  x: number
  y: number
  w: number
  h: number
  moved?: boolean
  static?: boolean
}
export type GridLayoutConfig = GridLayoutItem[]
export type GridLayoutKey = string | number | symbol

const gridLayoutProps = {
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
  isDraggable: {
    type: Boolean,
    default: true,
  },
  isResizable: {
    type: Boolean,
    default: true,
  },
  collision: Boolean,
}
export type GridLayoutProps = ExtractPropTypes<typeof gridLayoutProps>

const GridLayout = defineComponent({
  name: 'GridLayout',
  props: gridLayoutProps,
  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const layout = useLayout(props)

    provide(gridLayoutContextKey, layout)

    const activeDrag = ref<GridItemInfo | null>(null)

    function processItem(node: VNode) {
      const key = node.key
      if (!key) return
      const config = layout.getItem(String(key))
      if (!config) return
      const isDraggable = !config.static && props.isDraggable
      const isResizable = !config.static && props.isResizable
      return h(GridItem, {
        x: config.x,
        y: config.y,
        width: config.w,
        height: config.h,
        isDraggable,
        isResizable,
        dragEndFn: (evt, rect) => {
          const { x, y } = rect
          const _layout = layout.moveTo(config, x, y)
          emit('update:modelValue', _layout)
          activeDrag.value = null
        },
        dragStartFn: () => {
          /** pass */
        },
        dragFn: (evt, data) => {
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
        resizeFn: (evt, data) => {
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
        resizeStopFn: (evt, data) => {
          const { w, h } = data
          layout.resizeTo(config, w, h)
          activeDrag.value = null
        },
      }, () => node)
    }
    function placeholder() {
      if (!activeDrag.value) return null
      const { x, y, width, height } = activeDrag.value
      return h(GridItem, {
        class: 'vv-grid-layout--placeholder',
        x,
        y,
        width,
        height,
        move: false,
      })
    }

    return {
      processItem,
      placeholder,
      layout,
    }
  },

  render() {
    const defaultSlot =
      typeof this.$slots.default === 'function'
        ? this.$slots.default()
        : this.$slots.default ||
      []
    return h('div', {
      class: 'vv-grid-layout',
      style: {
        height: this.layout.calContainerHeight(),
      },
    }, [
      defaultSlot.map(this.processItem),
      this.placeholder(),
    ])
  },
})

export default GridLayout
