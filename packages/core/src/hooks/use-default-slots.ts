import { computed, useSlots } from 'vue-demi'

export function useDefaultSlots() {
  const slots = useSlots()

  return computed(() => typeof slots.default === 'function'
    ? slots.default()
    : slots.default)
}
