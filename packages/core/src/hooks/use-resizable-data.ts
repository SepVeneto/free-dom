import type { FreeDomProps } from '../components/freeDom'
import type FreeDomCore from '../components/freeDomCore'
import { onMounted, ref, watchEffect } from 'vue-demi'
import type { Ref } from 'vue-demi'

export function useResizableData(
  props: FreeDomProps,
  domRef: Ref<InstanceType<typeof FreeDomCore> | undefined>,
) {
  const width = ref(props.width || props.modelValue.w || 0)
  const height = ref(props.height || props.modelValue.h || 0)

  watchEffect(() => {
    width.value = props.width || props.modelValue.w || 0
  })
  watchEffect(() => {
    height.value = props.height || props.modelValue.h || 0
  })
  onMounted(() => {
    if (!width.value || !height.value) {
      const [_width, _height] = syncSize()
      width.value = _width
      height.value = _height
    }
  })
  function syncSize() {
    if (!domRef.value) return [0, 0]
    const { width, height } = domRef.value.$el.getBoundingClientRect()
    return [width, height]
  }

  return {
    width,
    height,
  }
}
