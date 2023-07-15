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
    if (!width.value || !height.value) {
      const [_width, _height] = syncSize()
      width.value = _width
      height.value = _height
    }
  })
  function getWidth() {
    return props.width || props.modelValue.w || props.minWidth
  }
  function getHeight() {
    return props.height || props.modelValue.h || props.minHeight
  }
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
