import { ref, unref } from 'vue-demi'
import type { Ref } from 'vue-demi'

type Node = (HTMLElement | undefined) | Ref<HTMLElement | undefined>

export function useCoreData(node: Node) {
  const lastX = ref(NaN)
  const lastY = ref(NaN)

  function create(x: number, y: number) {
    const isStart = isNaN(lastX.value)
    const _node = unref(node)
    if (!_node) {
      throw new Error('drag node does not exist')
    }
    if (isStart) {
      return {
        node: _node,
        deltaX: 0,
        deltaY: 0,
        lastX: x,
        lastY: y,
        x,
        y,
      }
    } else {
      return {
        node: _node,
        deltaX: x - lastX.value,
        deltaY: y - lastY.value,
        lastX: lastX.value,
        lastY: lastY.value,
        x,
        y,
      }
    }
  }

  return {
    lastX,
    lastY,
    create,
  }
}
