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
}

export const GridItem = defineComponent({
  name: 'GridItem',
  props: gridItemProps,

  setup() {
    const gridLayoutContext = inject(gridLayoutContextKey)
    if (!gridLayoutContext) {
      throw new Error('TODO')
    }
    const cellWidth = computed(() => gridLayoutContext.width / gridLayoutContext.cols)
  },
  render() {
    const defaultSlot =
      typeof this.$slots.default === 'function'
        ? this.$slots.default()
        : this.$slots.default ||
      []
    return h(FreeDom, {}, () => defaultSlot)
  },
})
