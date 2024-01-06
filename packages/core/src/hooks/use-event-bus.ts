import { ref } from 'vue-demi'

type Cb = (...args: any) => any
type Callbacks = Record<string, Cb[]>
export type EventBusOnHandle = (name: string, cb: Cb) => void
export type EventBusEmitHandle = (name: string, ...args: any[]) => void
export type EventBusOffHandle = (name: string) => void

export function useEventBus() {
  const callbacks = ref<Callbacks>({})

  const on: EventBusOnHandle = (name, cb) => {
    if (!callbacks.value[name]) {
      callbacks.value[name] = [cb]
    } else {
      callbacks.value[name].push(cb)
    }
  }
  const off: EventBusOffHandle = (name) => {
    callbacks.value[name].length = 0
  }
  const emit: EventBusEmitHandle = (name, ...args) => {
    const fns = callbacks.value[name] || []
    fns.forEach(fn => fn(...args))
  }

  return {
    on,
    off,
    emit,
  }
}
