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
    return props.w
      || props.modelValue.w
      || (props.autoSize ? undefined : props.minWidth)
  }
  function getHeight() {
    return props.h
      || props.modelValue.h
      || (props.autoSize ? undefined : props.minHeight)
  }
  async function syncSize(
    fixNonMonospaced: boolean,
    minWidth: number,
    minHeight: number,
  ) {
    if ((props.w && props.h) || (props.modelValue.w && props.modelValue.h)) return
    if (!domRef.value) return [0, 0]

    if (fixNonMonospaced) {
      // 确保css样式表解析完成重新渲染，同时字体文件加载完成
      await document.fonts.ready
    }
    const { width: w, height: h } = window.getComputedStyle(domRef.value.$el)
    width.value = Math.max(Math.ceil(parseFloat(w)), minWidth)
    height.value = Math.max(Math.ceil(parseFloat(h)), minHeight)
  }

  return {
    width,
    height,
    syncSize,
  }
}
