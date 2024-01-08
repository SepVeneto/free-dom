import type { MaybeRef, Ref } from 'vue-demi'
import { computed, h, ref } from 'vue-demi'
import { unrefElement, useElementBounding } from '@vueuse/core'
import { addUserSelectStyle, removeUserSelectStyle } from '../util'
import type { INode } from '../types'
import { useEventBus, useOperateHistory } from '../hooks'

export function useMask(target: MaybeRef, nodes: Ref<INode[]>) {
  const eventBus = useEventBus()
  const x = ref(0)
  const y = ref(0)
  const lastX = ref(0)
  const lastY = ref(0)
  const history = useOperateHistory(nodes)
  const hasEmit = ref(false)

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

    if (!hasEmit.value) {
      eventBus.emit('batch-select', 'start')
      hasEmit.value = true
    }

    const { x: offsetX, y: offsetY } = offsetFormat(evt)
    if (lastX.value === offsetX && lastY.value === offsetY) return
    lastX.value = offsetX
    lastY.value = offsetY
    handleBatchSelect()
  }
  function handleMouseup() {
    removeUserSelectStyle(ownerDoc.value)
    selecting.value = false
    hasEmit.value = false
    // 鼠标位置没有变化，没有触发框选操作
    if (lastX.value === x.value && lastY.value === y.value) {
      /**
       * pass
       */
    } else {
      history.push({ type: 'batch-select' })
      document.removeEventListener('mouseup', handleMouseup)
    }
    lastX.value = 0
    lastY.value = 0
    x.value = 0
    y.value = 0
    // 延迟选择事件的结束时间，保证在其它组件的onClickOutside之后触发
    setTimeout(() => {
      eventBus.emit('batch-select', 'end')
    })
  }
  function renderMask() {
    return h('div', {
      id: 'mask',
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
