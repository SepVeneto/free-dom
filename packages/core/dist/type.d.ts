import * as vue_demi from 'vue-demi';

declare const freeDom: vue_demi.DefineComponent<{
    customStyle: {
        type: vue_demi.PropType<Partial<vue_demi.CSSProperties>>;
        required: true;
    };
    scale: vue_demi.PropType<boolean | ("t" | "r" | "l" | "b" | "lt" | "lb" | "rt" | "rb")[]>;
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
    widgetRef: vue_demi.ShallowRef<any>;
    canMove: vue_demi.ComputedRef<boolean>;
    wrapStyle: vue_demi.Ref<{
        transition: string;
    }>;
    canScale: vue_demi.ComputedRef<boolean | ("t" | "r" | "l" | "b" | "lt" | "lb" | "rt" | "rb")[] | undefined>;
    dots: vue_demi.ComputedRef<readonly ["t", "r", "l", "b", "lt", "lb", "rt", "rb"] | ("t" | "r" | "l" | "b" | "lt" | "lb" | "rt" | "rb")[]>;
    active: vue_demi.Ref<boolean>;
    getDotPos: (dot: string) => vue_demi.CSSProperties;
    onMousedown: (evt: MouseEvent) => void;
    onMousedownDot: (evt: MouseEvent, dot: string) => void;
}, unknown, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, ("update:customStyle" | "select")[], "update:customStyle" | "select", vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<vue_demi.ExtractPropTypes<{
    customStyle: {
        type: vue_demi.PropType<Partial<vue_demi.CSSProperties>>;
        required: true;
    };
    scale: vue_demi.PropType<boolean | ("t" | "r" | "l" | "b" | "lt" | "lb" | "rt" | "rb")[]>;
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
declare const freeScene: vue_demi.DefineComponent<{
    preview: BooleanConstructor;
    move: BooleanConstructor;
    scale: vue_demi.PropType<boolean | ("t" | "r" | "l" | "b" | "lt" | "lb" | "rt" | "rb")[]>;
    diff: {
        type: NumberConstructor;
        default: number;
    };
}, {
    rectRef: vue_demi.ShallowRef<null>;
}, unknown, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<vue_demi.ExtractPropTypes<{
    preview: BooleanConstructor;
    move: BooleanConstructor;
    scale: vue_demi.PropType<boolean | ("t" | "r" | "l" | "b" | "lt" | "lb" | "rt" | "rb")[]>;
    diff: {
        type: NumberConstructor;
        default: number;
    };
}>>, {
    preview: boolean;
    move: boolean;
    diff: number;
}>;

export { freeDom, freeScene };
