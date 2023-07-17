import type { FreeDomProps } from '../components/freeDom'
import type FreeDomCore from '../components/freeDomCore'
import { onMounted, ref, watchEffect } from 'vue-demi'
import type { Ref } from 'vue-demi'

export function useResizableData(
  props: FreeDomProps,
  domRef: Ref<InstanceType<typeof FreeDomCore> | undefined>,
) {
  const width = ref(getWidth())
  const height = ref(getHeight())

  watchEffect(() => {
    width.value = getWidth()
  })
  watchEffect(() => {
    height.value = getHeight()
  })
  onMounted(() => {
    syncSize()
  })
  function getWidth() {
    return props.width || props.modelValue.w
  }
  function getHeight() {
    return props.height || props.modelValue.h
  }
  function syncSize() {
    if ((props.width && props.height) || (props.modelValue.w && props.modelValue.h)) return
    if (!domRef.value) return [0, 0]
    const { width: w, height: h } = domRef.value.$el.getBoundingClientRect()
    width.value = Math.max(Math.ceil(w), props.minWidth)
    height.value = Math.max(Math.ceil(h), props.minHeight)
  }

  return {
    width,
    height,
    syncSize,
  }
}
