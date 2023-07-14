import { ref, watchEffect } from 'vue-demi'
import type { CoreData } from '../components/freeDomCore'
import type { FreeDomProps } from '../components/freeDom'

export function useDraggableData(props: FreeDomProps) {
  const x = ref(props.x || props.modelValue.x || 0)
  const y = ref(props.y || props.modelValue.y || 0)

  watchEffect(() => {
    x.value = props.x || props.modelValue.x || 0
  })
  watchEffect(() => {
    y.value = props.y || props.modelValue.y || 0
  })

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
