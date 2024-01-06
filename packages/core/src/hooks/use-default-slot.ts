import { useSlots } from 'vue-demi'

export function useDefaultSlot() {
  const slots = useSlots()
  const slotList = typeof slots.default === 'function'
    ? slots.default()
    : slots.default
  const only = slotList?.[0]

  return {
    slots: slotList,
    only,
  }
}
