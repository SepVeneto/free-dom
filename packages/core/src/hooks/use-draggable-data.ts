import { ref, watchEffect } from 'vue-demi'
import type { CoreData, CoreFnCallback } from '../components/freeDomCore'
import type { FreeDomProps } from '../components/freeDom'

export function useDraggableData(props: FreeDomProps) {
  const x = ref(props.x || props.modelValue.x || 0)
  const y = ref(props.y || props.modelValue.y || 0)
  const deltaX = ref(0)
  const deltaY = ref(0)
  const dragData = ref()

  watchEffect(() => {
    x.value = props.x || props.modelValue.x || 0
  })
  watchEffect(() => {
    y.value = props.y || props.modelValue.y || 0
  })

  const handleDragStart: CoreFnCallback = (evt, data) => {
    props.dragStartFn(evt, data)
  }
  const handleDrag: CoreFnCallback = (evt, data) => {
    x.value = Math.round(data.x)
    y.value = Math.round(data.y)
    deltaX.value = data.deltaX
    deltaY.value = data.deltaY

    props.dragFn(evt, data)
  }
  const handleDragStop: CoreFnCallback = (evt, coreData) => {
    const data = dragData.value = create(coreData)

    props.dragStopFn(evt, data)
  }

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
    deltaX,
    deltaY,
    create,
    handleDragStart,
    handleDrag,
    handleDragStop,
  }
}
