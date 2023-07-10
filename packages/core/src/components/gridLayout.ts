import type { ExtractPropTypes, PropType, VNode } from 'vue'
import { defineComponent, h, provide, ref } from 'vue'
import { GridItem } from './gridItem'
import type { GridItemInfo } from './gridItem'
import { gridLayoutContextKey } from './tokens'
import { moveElement } from '../util'

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
  margin: {
    type: Array as PropType<number[]>,
    default: () => ([0, 0]),
  },
}
export type GridLayoutProps = ExtractPropTypes<typeof gridLayoutProps>

const GridLayout = defineComponent({
  name: 'GridLayout',
  props: gridLayoutProps,
  emits: ['update:modelValue'],

  setup(props, { emit }) {
    provide(gridLayoutContextKey, props)

    const activeDrag = ref<GridItemInfo | null>(null)

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
        dragEndFn: (rect) => {
          const { x, y } = rect
          const layout = moveElement(
            props.modelValue,
            config,
            x,
            y,
          )
          emit('update:modelValue', layout)
          activeDrag.value = null
        },
        dragStartFn: () => {
          /** pass */
        },
        dragFn: (evt, data) => {
          const placeholder = {
            x: config.x,
            y: config.y,
            width: config.w,
            height: config.h,
          }
          const { x, y } = data
          const layout = moveElement(
            props.modelValue,
            config,
            x,
            y,
          )
          emit('update:modelValue', layout)
          activeDrag.value = placeholder
        },
      }, () => node)
    }
    function placeholder() {
      if (!activeDrag.value) return null
      const { x, y, width, height } = activeDrag.value
      return h(GridItem, {
        class: 'grid-layout__placeholder',
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
    }
  },

  render() {
    const defaultSlot =
      typeof this.$slots.default === 'function'
        ? this.$slots.default()
        : this.$slots.default ||
      []
    return h('div', [
      defaultSlot.map(this.processItem),
      this.placeholder(),
    ])
  },
})

export default GridLayout
