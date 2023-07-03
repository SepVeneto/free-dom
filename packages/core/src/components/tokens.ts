import type { InjectionKey } from 'vue'
import type { GridLayoutProps } from './gridLayout'

export type GridLayoutContext = GridLayoutProps

export const gridLayoutContextKey: InjectionKey<GridLayoutContext> = Symbol('gridLayoutContext')
