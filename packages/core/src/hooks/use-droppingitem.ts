import { ref } from 'vue'
import type { useLayout } from './use-layout'
import type { GridLayoutProps } from '../components/gridLayout'
import type { PositionParams } from '../util'
import { calcXY, createRender } from '../util'

export function useDroppingItem(
  layout: ReturnType<typeof useLayout>,
  props: GridLayoutProps,
) {
  const droppingNode = ref()
  const position = ref<{ left: number, top: number, evt?: MouseEvent } | null>()

  function onDropover(evt: DragEvent) {
    evt.preventDefault()
    evt.stopPropagation()

    const gridRect = (evt.currentTarget as HTMLElement).getBoundingClientRect()
    const layerX = evt.clientX - gridRect.left
    const layerY = evt.clientY - gridRect.top
    const _pos = {
      left: layerX,
      top: layerY,
      evt,
    }

    if (!droppingNode.value) {
      droppingNode.value = createRender('div', { key: props.droppingItem.i })
      position.value = _pos
      const params: PositionParams = {
        cols: props.cols,
        margin: props.margin,
        maxRows: props.maxRows,
        rowHeight: props.rowHeight,
        width: props.width,
        containerPadding: props.containerPadding || props.margin,
      }
      const calPos = calcXY(params, layerX, layerY, props.droppingItem.w, props.droppingItem.h)
      layout.updateDroppingItem({
        ...props.droppingItem,
        x: calPos.x,
        y: calPos.y,
        static: false,
        isDraggable: true,
      })
    } else if (position.value) {
      const { left, top } = position.value
      if (left !== layerX && top !== layerY) {
        position.value = _pos
      }
    }
  }

  return {
    onDropover,
    droppingNode,
    position,
  }
}
