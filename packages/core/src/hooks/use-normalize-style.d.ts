import { CSSProperties, Ref } from 'vue-demi';
declare type Style = Partial<Record<keyof CSSProperties, string | number>>;
export declare function useNormalizeStyle(style: Style | Ref<any>): Ref<{
    transition: string;
}>;
export {};
