import { computed, useSlots } from 'vue-demi'

export function useDefaultSlot() {
  const slots = useSlots()
  const slotList = computed(() => {
    return typeof slots.default === 'function'
      ? slots.default()
      : slots.default
  })
  const only = computed(() => slotList.value?.filter(slot => {
    // DEV: vue2 vue3
    // @ts-expect-error: exist on vue2
    return !slot.isComment
  })[0] || null)
  return {
    slots: slotList,
    only,
  }
}
