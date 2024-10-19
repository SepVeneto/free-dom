import type { MaybeRef, Ref } from 'vue-demi'
import { computed, h, ref } from 'vue-demi'
import { unrefElement, useElementBounding } from '@vueuse/core'
import { addUserSelectStyle, clamp, removeUserSelectStyle } from '../util'
import type { INode } from '../types'
import { useEventBus, useOperateHistory } from '../hooks'
import type { FreeDomWrapProps } from '../components/freeDomWrap'
import debugInit from 'debug'

const debug = debugInit('freeDom:use-mask')

export function useMask(
  target: MaybeRef,
  props: FreeDomWrapProps,
  nodes: Ref<INode[]>,
  size: { width: Ref<number>, height: Ref<number> },
) {
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
      zIndex: 1,
    }
  })
  const selecting = ref(false)
  const prepareSelect = ref(false)
  const rect = useElementBounding(target)
  const ownerDoc = computed(() => unrefElement(target)?.ownerDocument)
  const activeNodes = computed(() => nodes.value.filter(node => {
    return !(props.disabledSelect || node.node.disabledSelect)
  }))

  function checkNode() {
    let selectedNode: INode | undefined
    activeNodes.value.forEach(node => {
      const rect = node.node._rect
      // eslint-disable-next-line eqeqeq
      if (rect.x == undefined ||
      // eslint-disable-next-line eqeqeq
          rect.y == undefined ||
      // eslint-disable-next-line eqeqeq
          rect.width == undefined ||
      // eslint-disable-next-line eqeqeq
          rect.height == undefined
      ) return false
      const x1 = rect.x
      const y1 = rect.y
      const x2 = x1 + rect.width
      const y2 = y1 + rect.height

      const isSelected = inArea(x1, y1, x2, y2)
      node.node.selected = isSelected
      if (isSelected) {
        selectedNode = node
      }
    })
    selectedNode?.el.focus()
  }
  function inArea(x1: number, y1: number, x2: number, y2: number) {
    const areaStartX = Math.min(startX.value, lastX.value)
    const areaStartY = Math.min(startY.value, lastY.value)
    const areaEndX = Math.max(startX.value, lastX.value)
    const areaEndY = Math.max(startY.value, lastY.value)

    debug('is selected', startX.value, startY.value, lastX.value, lastY.value)
    const crossX = isCrossing(areaStartX, areaEndX, x1, x2, Math.abs(x1 - x2) / 5)
    const crossY = isCrossing(areaStartY, areaEndY, y1, y2, Math.abs(y1 - y2) / 5)

    return crossX && crossY
  }
  function isCrossing(a: number, b: number, c: number, d: number, standard: number) {
    return (Math.max(a, c) - Math.min(b, d)) <= -standard
  }
  // evt.offsetX, evt.offsetY计算的是基于target计算的
  // 因此当容器内存在子元素或缩放方向会经过mask时offset不能代表在容器内的相对位置
  function offsetFormat(evt: MouseEvent) {
    const offsetX = evt.clientX - rect.x.value
    const offsetY = evt.clientY - rect.y.value
    return {
      x: offsetX,
      y: offsetY,
    }
  }
  function handleMousedown(evt: MouseEvent) {
    if (props.disabledBatch) return

    addUserSelectStyle(ownerDoc.value)
    const { x: offsetX, y: offsetY } = offsetFormat(evt)
    prepareSelect.value = true
    startX.value = offsetX
    startY.value = offsetY
    lastX.value = offsetX
    lastY.value = offsetY
    document.addEventListener('mouseup', handleMouseup)
  }
  function handleMousemove(evt: MouseEvent) {
    if (!prepareSelect.value) return

    if (!hasEmit.value) {
      eventBus.emit('batch-select', 'start')
      hasEmit.value = true
    }

    const { x: offsetX, y: offsetY } = offsetFormat(evt)

    debug(lastX.value, offsetX, lastY.value, offsetY)
    if (lastX.value === offsetX && lastY.value === offsetY) return
    selecting.value = true

    debug('cal', offsetX, 0, size.width.value)
    lastX.value = clamp(offsetX, 0, size.width.value)
    lastY.value = clamp(offsetY, 0, size.height.value)
    debug('update last', lastX.value, lastY.value)
    handleBatchSelect()
  }
  function handleMouseup() {
    removeUserSelectStyle(ownerDoc.value)
    prepareSelect.value = false
    selecting.value = false
    hasEmit.value = false
    // 鼠标位置没有变化，没有触发框选操作
    if (lastX.value === startX.value && lastY.value === startY.value) {
      /**
       * pass
       */
    } else {
      history.push({ type: 'batch-select' })
      // 延迟选择事件的结束时间，保证在其它组件的onClickOutside之后触发
      setTimeout(() => {
        eventBus.emit('batch-select', 'end', {
          lastX: lastX.value,
          lastY: lastY.value,
          startX: startX.value,
          startY: startY.value,
        })

        lastX.value = 0
        lastY.value = 0
        startX.value = 0
        startY.value = 0
      })
    }
    document.removeEventListener('mouseup', handleMouseup)
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
