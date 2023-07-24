import { computed, useSlots } from 'vue-demi'

export function useDefaultSlot() {
  const slots = useSlots()
  const slotList = computed(() => {
    return typeof slots.default === 'function'
      ? slots.default()
      : slots.default
  })
  const only = computed(() => slotList.value?.[0])
  // const only = computed(() => slotList.value?.filter(slot => {
  //   return true
  //   // return !slot.isComment
  // })[0] || null)
  return {
    slots: slotList,
    only,
  }
}
