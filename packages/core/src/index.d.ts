import './style/index.scss';
export declare const freeDom: import("vue-demi").DefineComponent<{
    customStyle: {
        type: import("vue-demi").PropType<Partial<import("vue-demi").CSSProperties>>;
        required: true;
    };
    scale: import("vue-demi").PropType<boolean | ("t" | "r" | "l" | "b" | "lt" | "lb" | "rt" | "rb")[]>;
    move: BooleanConstructor;
    preview: BooleanConstructor;
    limitWidth: {
        type: NumberConstructor;
        default: undefined;
    };
    limitHeight: {
        type: NumberConstructor;
        default: undefined;
    };
}, {
    widgetRef: import("vue-demi").ShallowRef<any>;
    canMove: import("vue-demi").ComputedRef<boolean>;
    wrapStyle: import("vue-demi").Ref<{
        transition: string;
    }>;
    canScale: import("vue-demi").ComputedRef<boolean | ("t" | "r" | "l" | "b" | "lt" | "lb" | "rt" | "rb")[] | undefined>;
    dots: import("vue-demi").ComputedRef<readonly ["t", "r", "l", "b", "lt", "lb", "rt", "rb"] | ("t" | "r" | "l" | "b" | "lt" | "lb" | "rt" | "rb")[]>;
    active: import("vue-demi").Ref<boolean>;
    getDotPos: (dot: string) => import("vue-demi").CSSProperties;
    onMousedown: (evt: MouseEvent) => void;
    onMousedownDot: (evt: MouseEvent, dot: string) => void;
}, unknown, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, ("update:customStyle" | "select")[], "update:customStyle" | "select", import("vue-demi").VNodeProps & import("vue-demi").AllowedComponentProps & import("vue-demi").ComponentCustomProps, Readonly<import("vue-demi").ExtractPropTypes<{
    customStyle: {
        type: import("vue-demi").PropType<Partial<import("vue-demi").CSSProperties>>;
        required: true;
    };
    scale: import("vue-demi").PropType<boolean | ("t" | "r" | "l" | "b" | "lt" | "lb" | "rt" | "rb")[]>;
    move: BooleanConstructor;
    preview: BooleanConstructor;
    limitWidth: {
        type: NumberConstructor;
        default: undefined;
    };
    limitHeight: {
        type: NumberConstructor;
        default: undefined;
    };
}>> & {
    "onUpdate:customStyle"?: ((...args: any[]) => any) | undefined;
    onSelect?: ((...args: any[]) => any) | undefined;
}, {
    preview: boolean;
    move: boolean;
    limitWidth: number;
    limitHeight: number;
}>;
export declare const freeScene: import("vue-demi").DefineComponent<{
    preview: BooleanConstructor;
    move: BooleanConstructor;
    scale: import("vue-demi").PropType<boolean | ("t" | "r" | "l" | "b" | "lt" | "lb" | "rt" | "rb")[]>;
    diff: {
        type: NumberConstructor;
        default: number;
    };
}, {
    rectRef: import("vue-demi").ShallowRef<null>;
}, unknown, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, {}, string, import("vue-demi").VNodeProps & import("vue-demi").AllowedComponentProps & import("vue-demi").ComponentCustomProps, Readonly<import("vue-demi").ExtractPropTypes<{
    preview: BooleanConstructor;
    move: BooleanConstructor;
    scale: import("vue-demi").PropType<boolean | ("t" | "r" | "l" | "b" | "lt" | "lb" | "rt" | "rb")[]>;
    diff: {
        type: NumberConstructor;
        default: number;
    };
}>>, {
    preview: boolean;
    move: boolean;
    diff: number;
}>;
