import type { FreeDomProps } from '../components/freeDom'
import { ref, watchEffect } from 'vue-demi'

export function useResizableData(props: FreeDomProps) {
  const width = ref(props.width || props.modelValue.w)
  const height = ref(props.height || props.modelValue.h)

  watchEffect(() => {
    width.value = props.width || props.modelValue.w
  })
  watchEffect(() => {
    height.value = props.height || props.modelValue.h
  })

  return {
    width,
    height,
  }
}
