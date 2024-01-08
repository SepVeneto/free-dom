import type { FreeDomWrapProps } from '../components/freeDomWrap'
import type { INode, INodeInfo, IPos } from '../types'
import type {
  EventBusEmitHandle,
  EventBusOffHandle,
  EventBusOnHandle,
} from '../hooks'
import type { UnwrapRef } from 'vue-demi'

export const SceneToken = Symbol('Scene')

export type SceneTokenContext = UnwrapRef<{
  nodes: INode[]
  history: ReturnType<typeof import('../hooks')['useOperateHistory']>
  register: (uuid: number, node: INodeInfo) => void
  remove: (uuid: number) => void
  checkValid: (pos: IPos) => boolean
  correct: (pos: Required<IPos>) => Required<IPos>
  on: EventBusOnHandle
  off: EventBusOffHandle
  emit: EventBusEmitHandle
}> & FreeDomWrapProps | undefined
