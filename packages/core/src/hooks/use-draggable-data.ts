import { ref } from 'vue-demi'
import type { CoreData } from '../components/freeDomCore'
import type { FreeDomProps } from '../components/freeDom'

export function useDraggableData(props: FreeDomProps) {
  const x = ref(props.x)
  const y = ref(props.y)

  function create(coreData: CoreData) {
    return {
      node: coreData.node,
      x: x.value + coreData.deltaX,
      y: y.value + coreData.deltaY,
      deltaX: coreData.deltaX,
      deltaY: coreData.deltaY,
      lastX: x.value,
      lastY: y.value,
    }
  }
  return {
    x,
    y,
    create,
  }
}
