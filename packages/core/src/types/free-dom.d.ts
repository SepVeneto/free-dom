import { UnwrapRef } from 'vue-demi'

export type IPos = {
  x?: number
  y?: number
  width?: number
  height?: number
}
export type INodeInfo = UnwrapRef<{
  _rect: IPos
  selected: Ref<boolean>,
  trigger: (pos: { x: number, y: number, w: number, h: number }) => void
}>
export type INode = {
  uuid: number
  node: INodeInfo
}