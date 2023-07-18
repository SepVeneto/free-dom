import type { FreeDomProps } from '../components/freeDom'
import type FreeDomCore from '../components/freeDomCore'
import { ref, watchEffect } from 'vue-demi'
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
  function getWidth() {
    return props.width || props.modelValue.w
  }
  function getHeight() {
    return props.height || props.modelValue.h
  }
  async function syncSize(fixNonMonospaced?: boolean) {
    if ((props.width && props.height) || (props.modelValue.w && props.modelValue.h)) return
    if (!domRef.value) return [0, 0]

    if (fixNonMonospaced) {
      // 确保css样式表解析完成重新渲染，同时字体文件加载完成
      await document.fonts.ready
    }

    const { width: w, height: h } = window.getComputedStyle(domRef.value.$el)
    width.value = Math.max(Math.ceil(parseFloat(w)), props.minWidth)
    height.value = Math.max(Math.ceil(parseFloat(h)), props.minHeight)
  }

  return {
    width,
    height,
    syncSize,
  }
}
