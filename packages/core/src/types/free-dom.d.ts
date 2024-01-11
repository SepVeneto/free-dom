import { UnwrapRef } from 'vue-demi'

export type IPos = {
  x?: number
  y?: number
  width?: number
  height?: number
  deltaX?: number
  deltaY?: number
}
export type INodeInfo = UnwrapRef<{
  _rect: IPos
  disabledSelect: Ref<boolean>
  selected: Ref<boolean>,
  trigger: (pos: { x: number, y: number, w: number, h: number }) => void
}>
export type INode = {
  el: HTMLElement,
  uuid: number
  node: INodeInfo
}