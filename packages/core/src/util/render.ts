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
  const _listeners = normalizeListeners(listeners)
  const options = isVue2
    ? {
        ...normalizeAttrs(attrs),
        props,
        ..._listeners,
      }
    : {
        ...attrs,
        ...props,
        ..._listeners,
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

const NATIVE_ON_REGEXP = /^nativeOn([A-Z]\S*)/
const ON_REGEXP = /^on([A-Z]\S*)/
type Listeners = Record<string, (...args: any[]) => void>
function normalizeListeners(listeners: Listeners) {
  const on: Listeners = {}
  const nativeOn: Listeners = {}
  let needOn = false
  let needNativeOn = false
  Object.entries(listeners).forEach(([key, fn]) => {
    if (isVue2) {
      const onName = key.match(ON_REGEXP)?.[1]
      if (onName) {
        needOn = true
        const name = onName.replace(/\S/, (letter) => letter.toLowerCase())
        on[name] = fn
        return
      }
      const nativeName = key.match(NATIVE_ON_REGEXP)?.[1]
      if (nativeName) {
        needNativeOn = true
        const name = nativeName.replace(/\S/, (letter) => letter.toLowerCase())
        nativeOn[name] = fn
      }
    } else {
      needOn = true
      const name = key.replace(NATIVE_ON_REGEXP, (_, $1) => `on${$1}`)
      on[name] = fn
    }
  })

  const res: { on?: Listeners, nativeOn?: Listeners } = {}
  if (needOn) res.on = on
  if (needNativeOn) res.nativeOn = nativeOn
  return isVue2 ? res : res.on
}

function normalizeAttrs(attrs: Record<string, any>) {
  const { ref, class: _class, style, ..._attrs } = attrs
  return {
    ref,
    class: _class,
    style,
    attrs: _attrs,
  }
}
