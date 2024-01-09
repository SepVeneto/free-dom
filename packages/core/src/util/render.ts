import { merge } from 'lodash-unified'
import type { Component, VNode, VNodeArrayChildren } from 'vue-demi'
import { h, isVue2 } from 'vue-demi'

type RawChildren = string | number | boolean | VNode | VNodeArrayChildren | (() => any)
type Slots = Record<string, any> | RawChildren

export function createRender(
  comp: VNode,
  attrs?: Record<string, any>,
  props?: Record<string, any>,
  listeners?: Record<string, (...args: any[]) => void>,
): VNode

export function createRender(
  comp: Component | null | string,
  attrs?: Record<string, any>,
  props?: Record<string, any>,
  listeners?: Record<string, (...args: any[]) => void>,
): (slots?: Slots) => VNode

export function createRender(
  comp: Component | null | VNode | string,
  attrs: Record<string, any> = {},
  props: Record<string, any> = {},
  listeners: Record<string, (...args: any[]) => void> = {},
) {
  if (!comp) return () => (null)
  const options = isVue2
    ? {
        ...attrs,
        props,
        on: listeners,
      }
    : {
        ...attrs,
        ...props,
      }
  if (isVue2 && typeof comp === 'object' && !('render' in comp)) {
    // @ts-expect-error: in vue2 cannot extend vnode by recreate
    merge(comp.data, options)
    return comp
  }
  return (slots: Slots) => {
    if (isVue2) {
      if (Object.prototype.toString.call(slots) === '[object Object]') {
        return h(comp, { ...options, scopedSlots: slots })
      } else {
        return h(comp, options, Array.isArray(slots) ? slots : [slots])
      }
    } else {
      return h(comp, options, slots)
    }
  }
}
