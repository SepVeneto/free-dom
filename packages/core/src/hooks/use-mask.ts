import type { MaybeRef, Ref } from 'vue-demi'
import { computed, h, ref } from 'vue-demi'
import { unrefElement, useElementBounding } from '@vueuse/core'
import { addUserSelectStyle, removeUserSelectStyle } from '../util'
import type { INode } from '../types'
import { useEventBus, useOperateHistory } from '../hooks'

const BOUNDARY = -30

export function useMask(target: MaybeRef, nodes: Ref<INode[]>) {
  const eventBus = useEventBus()
  const startX = ref(0)
  const startY = ref(0)
  const lastX = ref(0)
  const lastY = ref(0)
  const history = useOperateHistory(nodes)
  const hasEmit = ref(false)

  const style = computed(() => {
    const width = lastX.value - startX.value
    const height = lastY.value - startY.value
    return {
      visibility: selecting.value ? 'visible' : 'hidden',
      border: '2px solid rgb(0,120,215)',
      background: 'rgb(0,120,215,0.3)',
      position: 'absolute',
      top: startY.value + (height < 0 ? height : 0) + 'px',
      left: startX.value + (width < 0 ? width : 0) + 'px',
      width: Math.abs(width) + 'px',
      height: Math.abs(height) + 'px',
    }
  })
  const selecting = ref(false)
  const rect = useElementBounding(target)
  const ownerDoc = computed(() => unrefElement(target)?.ownerDocument)

  function checkNode() {
    nodes.value.forEach(node => {
      const rect = node.node._rect
      if (!rect.x || !rect.y || !rect.width || !rect.height) return false
      const x1 = rect.x
      const y1 = rect.y
      const x2 = x1 + rect.width
      const y2 = y1 + rect.height
      node.node.selected = inArea(x1, y1, x2, y2)
    })
  }
  function inArea(x1: number, y1: number, x2: number, y2: number) {
    const areaStartX = Math.min(startX.value, lastX.value)
    const areaStartY = Math.min(startY.value, lastY.value)
    const areaEndX = Math.max(startX.value, lastX.value)
    const areaEndY = Math.max(startY.value, lastY.value)

    const crossX = isCrossing(areaStartX, areaEndX, x1, x2)
    const crossY = isCrossing(areaStartY, areaEndY, y1, y2)

    return crossX && crossY
  }
  function isCrossing(a: number, b: number, c: number, d: number) {
    return (Math.max(a, c) - Math.min(b, d)) <= BOUNDARY
  }
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
    startX.value = offsetX
    startY.value = offsetY
    lastX.value = offsetX
    lastY.value = offsetY
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
    if (lastX.value === startX.value && lastY.value === startY.value) {
      /**
       * pass
       */
    } else {
      history.push({ type: 'batch-select' })
      document.removeEventListener('mouseup', handleMouseup)
    }
    lastX.value = 0
    lastY.value = 0
    startX.value = 0
    startY.value = 0
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
    checkNode()
  }

  return {
    selecting,
    renderMask,
    handleMousedown,
    handleMousemove,
  }
}