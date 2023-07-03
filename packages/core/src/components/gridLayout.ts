import type { ExtractPropTypes, PropType, VNode } from 'vue'
import { defineComponent, h, provide } from 'vue'
import { GridItem } from './gridItem'
import { gridLayoutContextKey } from './tokens'

export type GridLayoutItem = {
  i: string | number
  x: number
  y: number
  w: number
  h: number
}
export type GridLayoutConfig = GridLayoutItem[]
export type GridLayoutKey = string | number | symbol

const gridLayoutProps = {
  modelValue: {
    type: Array as PropType<GridLayoutConfig>,
    required: true,
    default: () => ([]),
  },
  cols: {
    type: Number,
    default: 12,
  },
  rowHeight: {
    type: Number,
    default: 30,
  },
  width: {
    type: Number,
    default: 1200,
  },
}
export type GridLayoutProps = ExtractPropTypes<typeof gridLayoutProps>

export const GridLayout = defineComponent({
  name: 'GridLayout',
  props: gridLayoutProps,
  emits: ['update:modelValue'],

  setup(props) {
    provide(gridLayoutContextKey, props)
    function getLayoutItem(key: GridLayoutKey) {
      const item = props.modelValue.find(item => item.i === key)
      return item
    }

    function processItem(node: VNode) {
      const key = node.key
      if (!key) return
      const config = getLayoutItem(key)
      if (!config) return
      return h(GridItem, {
        x: config.x,
        y: config.y,
        width: config.w,
        height: config.h,
      }, () => node)
    }

    return {
      processItem,
    }
  },

  render() {
    const defaultSlot =
      typeof this.$slots.default === 'function'
        ? this.$slots.default()
        : this.$slots.default ||
      []
    return h('div', [defaultSlot.map(this.processItem)])
  },
})
