import { ref } from 'vue'
import type { CoreData } from '../components/freeDomCore'

export function useDraggableData() {
  const x = ref(0)
  const y = ref(0)

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
