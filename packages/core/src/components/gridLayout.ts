import type { ExtractPropTypes, PropType, VNode } from 'vue'
import { computed, defineComponent, h } from 'vue'
import { FreeDom } from './freeDom'

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
    const cellWidth = computed(() => props.width / props.cols)
    function getLayoutItem(key: GridLayoutKey) {
      const item = props.modelValue.find(item => item.i === key)
      return item
    }
    function wrapGridItem(node: VNode) {
      const key = node.key
      if (!key) {
        return
      }
      const config = getLayoutItem(key)
      if (!config) return
      return h(
        FreeDom,
        {
          width: cellWidth.value * config.w,
          height: props.rowHeight * config.h,
        },
        () => node,
      )
    }

    return {
      wrapGridItem,
    }
  },

  render() {
    const defaultSlot =
      typeof this.$slots.default === 'function'
        ? this.$slots.default()
        : this.$slots.default ||
      []
    return h('div', [defaultSlot.map(this.wrapGridItem)])
  },
})
