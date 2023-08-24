import type { FreeDomWrapProps, INode, INodeInfo, IPos } from '../components/freeDomWrap'
import type {
  EventBusEmitHandle,
  EventBusOffHandle,
  EventBusOnHandle,
} from '../hooks'
export const SceneToken = Symbol('Scene')

export type SceneTokenContext = {
  nodes: INode[]
  register: (uuid: number, node: INodeInfo) => void
  remove: (uuid: number) => void
  checkValid: (pos: IPos) => boolean
  on: EventBusOnHandle
  off: EventBusOffHandle
  emit: EventBusEmitHandle
} & FreeDomWrapProps | undefined
