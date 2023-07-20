import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import { useThrottleFn } from '@vueuse/core'

export function useWidth(domRef: Ref<HTMLElement | undefined>) {
  const width = ref(1200)

  onMounted(() => {
    resizeWidth()
    window.addEventListener('resize', throttleResize)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', throttleResize)
  })
  const throttleResize = useThrottleFn(resizeWidth)
  function resizeWidth() {
    width.value = domRef.value?.getBoundingClientRect().width || 1200
  }
  return width
}
