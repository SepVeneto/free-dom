import { FreeDomWrapProps, INode, INodeInfo, IPos } from "../components/freeDomWrap"
export const SceneToken = Symbol('Scene')

export type SceneTokenContext = {
  nodes: INode[]
  register: (uuid: string, node: INodeInfo) => void
  checkValid: (pos: IPos) => boolean
} & FreeDomWrapProps