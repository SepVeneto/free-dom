import { FreeDomWrapProps, INode, INodeInfo, IPos } from "../components/freeDomWrap";
export declare const SceneToken: unique symbol;
export declare type SceneTokenContext = {
    nodes: INode[];
    register: (uuid: string, node: INodeInfo) => void;
    checkValid: (pos: IPos) => boolean;
} & FreeDomWrapProps;
