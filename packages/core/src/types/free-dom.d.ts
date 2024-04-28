import { UnwrapRef } from 'vue-demi'
import { FreeDomProps } from '../components/freeDom'

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
  props: FreeDomProps,
  trigger: (pos: { x: number, y: number, w: number, h: number }) => void
}>
export type INode = {
  el: HTMLElement,
  uuid: number
  node: INodeInfo
}