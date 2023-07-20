import type { InjectionKey } from 'vue-demi'
import type { useLayout } from './useLayout'

export type GridLayoutContext = ReturnType<typeof useLayout>

export const gridLayoutContextKey: InjectionKey<GridLayoutContext> = Symbol('gridLayoutContext')
