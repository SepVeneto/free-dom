import { computed, defineComponent, h, inject } from 'vue'
import { FreeDom } from './freeDom'

import { gridLayoutContextKey } from './tokens'

const gridItemProps = {
  cols: {
    type: Number,
    required: true,
  },
  rowHeight: {
    type: Number,
    required: true,
  },
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
}

export const GridItem = defineComponent({
  name: 'GridItem',
  props: gridItemProps,

  setup(props) {
    const gridLayoutContext = inject(gridLayoutContextKey)
    if (!gridLayoutContext) {
      throw new Error('TODO')
    }
    const cellWidth = computed(() => gridLayoutContext.width / gridLayoutContext.cols)
    const x = computed(() => props.x * cellWidth.value)
    const y = computed(() => props.y * props.height)
    const width = computed(() => props.width * cellWidth.value)
    const height = computed(() => gridLayoutContext.rowHeight * props.height)

    return {
      x,
      y,
      width,
      height,
    }
  },
  render() {
    const defaultSlot =
      typeof this.$slots.default === 'function'
        ? this.$slots.default()
        : this.$slots.default ||
      []
    return h(FreeDom, {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    }, () => defaultSlot)
  },
})
