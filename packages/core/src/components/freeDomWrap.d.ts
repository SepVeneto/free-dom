import { ExtractPropTypes, PropType } from "vue-demi";
export declare const freeDomWrapProps: {
    preview: BooleanConstructor;
    move: BooleanConstructor;
    scale: PropType<boolean | ("t" | "r" | "l" | "b" | "lt" | "lb" | "rt" | "rb")[]>;
    diff: {
        type: NumberConstructor;
        default: number;
    };
};
export declare type FreeDomWrapProps = ExtractPropTypes<typeof freeDomWrapProps>;
export declare type INode = {
    uuid: string;
    node: INodeInfo;
};
export declare type INodeInfo = {
    _rect: IPos;
    trigger: () => void;
};
export declare type IPos = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export declare const FreeDomWrap: import("vue-demi").DefineComponent<{
    preview: BooleanConstructor;
    move: BooleanConstructor;
    scale: PropType<boolean | ("t" | "r" | "l" | "b" | "lt" | "lb" | "rt" | "rb")[]>;
    diff: {
        type: NumberConstructor;
        default: number;
    };
}, {
    rectRef: import("vue-demi").ShallowRef<null>;
}, unknown, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, {}, string, import("vue-demi").VNodeProps & import("vue-demi").AllowedComponentProps & import("vue-demi").ComponentCustomProps, Readonly<ExtractPropTypes<{
    preview: BooleanConstructor;
    move: BooleanConstructor;
    scale: PropType<boolean | ("t" | "r" | "l" | "b" | "lt" | "lb" | "rt" | "rb")[]>;
    diff: {
        type: NumberConstructor;
        default: number;
    };
}>>, {
    preview: boolean;
    move: boolean;
    diff: number;
}>;
