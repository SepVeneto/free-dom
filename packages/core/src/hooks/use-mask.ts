import type { MaybeRef, Ref } from 'vue-demi'
import { computed, h, ref } from 'vue-demi'
import { unrefElement, useElementBounding } from '@vueuse/core'
import { addUserSelectStyle, removeUserSelectStyle } from '../util'
import type { INode } from '../components/freeDomWrap'
import { nextTick } from 'vue'

export function useMask(target: MaybeRef, nodes: Ref<INode[]>) {
  const x = ref(0)
  const y = ref(0)
  const lastX = ref(0)
  const lastY = ref(0)

  const style = computed(() => {
    const width = lastX.value - x.value
    const height = lastY.value - y.value
    return {
      background: 'crimson',
      position: 'absolute',
      top: y.value + (height < 0 ? height : 0) + 'px',
      left: x.value + (width < 0 ? width : 0) + 'px',
      width: Math.abs(width) + 'px',
      height: Math.abs(height) + 'px',
    }
  })
  const selecting = ref(false)
  const rect = useElementBounding(target)
  const ownerDoc = computed(() => unrefElement(target)?.ownerDocument)

  function offsetFormat(evt: MouseEvent) {
    const offsetX = evt.clientX - rect.x.value
    const offsetY = evt.clientY - rect.y.value
    return {
      x: offsetX,
      y: offsetY,
    }
  }
  function handleMousedown(evt: MouseEvent) {
    addUserSelectStyle(ownerDoc.value)
    const { x: offsetX, y: offsetY } = offsetFormat(evt)
    selecting.value = true
    x.value = offsetX
    y.value = offsetY
    lastX.value = x.value
    lastY.value = y.value
    document.addEventListener('mouseup', handleMouseup)
  }
  function handleMousemove(evt: MouseEvent) {
    if (!selecting.value) return
    handleBatchSelect()
    const { x: offsetX, y: offsetY } = offsetFormat(evt)
    lastX.value = offsetX
    lastY.value = offsetY
  }
  function handleMouseup() {
    removeUserSelectStyle(ownerDoc.value)
    selecting.value = false
    lastX.value = 0
    lastY.value = 0
    x.value = 0
    y.value = 0
    document.removeEventListener('mouseup', handleMouseup)
  }
  function renderMask() {
    return h('div', {
      style: style.value,
    })
  }
  async function handleBatchSelect() {
    nodes.value.forEach(node => {
      node.node.selected = true
    })
  }

  return {
    selecting,
    renderMask,
    handleMousedown,
    handleMousemove,
  }
}
