import { Scene as _scene } from './scene';
export declare const freeDom: import("vue-demi").DefineComponent<{
    customStyle: {
        type: import("vue-demi").PropType<import("vue-demi").CSSProperties>;
        required: true;
    };
    scale: BooleanConstructor;
    move: BooleanConstructor;
    active: BooleanConstructor;
}, {
    widgetRef: import("vue-demi").ShallowRef<any>;
    canMove: import("vue-demi").ComputedRef<boolean>;
    wrapStyle: import("vue-demi").Ref<{
        transition: string;
    }>;
    canScale: import("vue-demi").ComputedRef<boolean>;
    dots: import("vue-demi").ComputedRef<string[]>;
    getDotPos: (dot: string) => import("vue-demi").CSSProperties;
    onMousedown: (evt: MouseEvent) => void;
    onMousedownDot: (evt: MouseEvent, dot: string) => void;
}, unknown, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, ("update:customStyle" | "select")[], "update:customStyle" | "select", import("vue-demi").VNodeProps & import("vue-demi").AllowedComponentProps & import("vue-demi").ComponentCustomProps, Readonly<import("vue-demi").ExtractPropTypes<{
    customStyle: {
        type: import("vue-demi").PropType<import("vue-demi").CSSProperties>;
        required: true;
    };
    scale: BooleanConstructor;
    move: BooleanConstructor;
    active: BooleanConstructor;
}>> & {
    "onUpdate:customStyle"?: ((...args: any[]) => any) | undefined;
    onSelect?: ((...args: any[]) => any) | undefined;
}, {
    scale: boolean;
    move: boolean;
    active: boolean;
}>;
export declare const Scene: typeof _scene;
