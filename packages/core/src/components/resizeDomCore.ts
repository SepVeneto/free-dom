import { computed, defineComponent, h, shallowRef } from 'vue-demi'
import type { ExtractPropTypes, PropType } from 'vue-demi'
import { useDefaultSlot } from '../hooks'
import FreeDomCore from './freeDomCore'
import type { CoreFnCallback, FreeDomCoreProps } from './freeDomCore'
import { createRender } from '../util'

const Dots = ['t', 'r', 'l', 'b', 'lt', 'lb', 'rt', 'rb'] as const
type IDot = typeof Dots[number]

export type ResizeData = {
  node: HTMLElement
  width: number
  height: number
  handle: IDot
}
export type ResizeFnCallback = (evt: MouseEvent, resizeData: ResizeData) => void
function noop() { /* noop */ }

export const resizeDomCoreProps = {
  dragOpts: {
    type: Object as PropType<Partial<FreeDomCoreProps>>,
    default: () => ({}),
  },
  width: {
    type: Number,
    default: 0,
  },
  height: {
    type: Number,
    default: 0,
  },
  scale: {
    type: [Boolean, Array] as PropType<IDot[] | boolean>,
    default: undefined,
  },
  startFn: {
    type: Function as PropType<ResizeFnCallback>,
    default: noop,
  },
  stopFn: {
    type: Function as PropType<ResizeFnCallback>,
    default: noop,
  },
  resizeFn: {
    type: Function as PropType<ResizeFnCallback>,
    default: noop,
  },
  minWidth: {
    type: Number,
    default: 50,
  },
  minHeight: {
    type: Number,
    default: 50,
  },
  lockAspectRatio: Boolean,
}
export type ResizeDomCoreProps = ExtractPropTypes<typeof resizeDomCoreProps>

const resizeDomCore = defineComponent({
  name: 'ResizeDomCore',
  props: resizeDomCoreProps,
  setup(props, { slots }) {
    const dots = computed(() => {
      const _dots = props.scale
      return Array.isArray(_dots) ? _dots : Dots
    })
    const lastRect = shallowRef<DOMRect | undefined>()

    function runConstraints(width: number, height: number, axis: IDot) {
      const { lockAspectRatio } = props
      if (!props.minHeight && !props.minWidth && !lockAspectRatio) return [width, height]

      if (lockAspectRatio && axis.length === 2) {
        const ratio = props.width / props.height

        if (ratio > 1) {
          height = Math.max(height, props.minHeight)
          width = height * ratio
        } else {
          width = Math.max(width, props.minWidth)
          height = width / ratio
        }
      } else {
        width = Math.max(width, props.minWidth)
        height = Math.max(height, props.minHeight)
      }

      return [width, height]
    }

    function handleResize(
      handleName: 'resize' | 'start' | 'stop',
      axis: IDot,
    ): CoreFnCallback {
      return (evt, { node, deltaX, deltaY }) => {
        if (handleName === 'start') lastRect.value = undefined

        const canDragX = axis !== 't' && axis !== 'b'
        const canDragY = axis !== 'l' && axis !== 'r'

        const axisH = axis[0]
        const axisV = axis[axis.length - 1]

        const handleRect = node.getBoundingClientRect()

        lastRect.value = handleRect

        if (axisH === 'l') deltaX = -deltaX
        if (axisV === 't') deltaY = -deltaY

        let width = props.width + (canDragX ? deltaX : 0)
        let height = props.height + (canDragY ? deltaY : 0)
        if (!evt.shiftKey) {
          [width, height] = runConstraints(width, height, axis)
        }

        const sizeChanged = width !== props.width || height !== props.height

        const fnName = `${handleName}Fn` as const
        const cb = typeof props[fnName] === 'function' ? props[fnName] : null
        const shouldSkipCb = handleName === 'resize' && !sizeChanged
        if (cb && !shouldSkipCb) {
          cb(evt, { node, width, height, handle: axis })
        }

        if (handleName === 'stop') lastRect.value = undefined
      }
    }
    function renderResizehandler(axis: IDot) {
      if (!slots.handler) {
        return () => h('i', {
          dataType: 'handler',
          class: [
            'vv-resize-dom--handler',
            `vv-resize-dom--handler__${axis}`,
          ],
        })
      }

      return () => slots.handler?.(axis)
    }

    return {
      dots,
      handleResize,
      renderResizehandler,
    }
  },
  render() {
    const { slots: children } = useDefaultSlot()
    const slots = [
      ...(children || []),
      this.dots.map(dot => {
        return createRender(
          FreeDomCore,
          { class: [this.dragOpts.disabled && 'vv-resize-dom--disabled'] },
          {
            ...this.dragOpts,
            stopFn: this.handleResize('stop', dot),
            startFn: this.handleResize('start', dot),
            dragFn: this.handleResize('resize', dot),
          },
        )(this.renderResizehandler(dot))
      }),
    ]
    return createRender(
      'div',
      { class: 'vv-resize-dom--box' },
    )(slots)
  },
})

export default resizeDomCore
