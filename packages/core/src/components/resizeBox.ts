import { computed, defineComponent, h, inject } from 'vue'
import type { CSSProperties, PropType } from 'vue'
import type { SceneTokenContext } from '../util'
import { SceneToken } from '../util'
import { useDefaultSlot } from '../hooks'
import FreeDomCore from './freeDomCore'
import type { CoreFnCallback } from './freeDomCore'

const Dots = ['t', 'r', 'l', 'b', 'lt', 'lb', 'rt', 'rb'] as const
type IDot = typeof Dots[number]
const DIRECT = {
  l: 'w',
  r: 'e',
  t: 'n',
  b: 's',
}
export type ResizeData = {
  node: HTMLElement
  width: number
  height: number
  handle: IDot
}
export type ResizeFnCallback = (evt: MouseEvent, resizeData: ResizeData) => void
function noop() { /* noop */ }

const resizeBox = defineComponent({
  name: 'ResizeBox',
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    scale: {
      type: [Boolean, Array] as PropType<IDot[] | boolean>,
      default: undefined,
    },
    handler: {
      type: String as PropType<'dot' | 'mark'>,
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
  },
  setup(props) {
    const { slots } = useDefaultSlot()
    const SceneContext = inject<SceneTokenContext>(SceneToken, undefined)
    const canScale = computed(() => (SceneContext?.scale || props.scale))
    const handlerType = computed(() => SceneContext?.handler || props.handler)
    const dots = computed(() => {
      const _dots = SceneContext && Array.isArray(SceneContext.scale)
        ? SceneContext.scale
        : props.scale
      return Array.isArray(_dots) ? _dots : Dots
    })

    // function getDotPos(dot: string): CSSProperties {
    //   const { width, height } = _rect
    //   const isL = /l/.test(dot)
    //   const isR = /r/.test(dot)
    //   const isT = /t/.test(dot)
    //   // const isB = /b/.test(dot);

    //   let left, top

    //   if (dot.length === 2) {
    //     left = isL ? 0 : width
    //     top = isT ? 0 : height
    //   } else {
    //     if (isL || isR) {
    //       left = isL ? 0 : width
    //       top = Number(height) / 2
    //     } else {
    //       left = Number(width) / 2
    //       top = isT ? 0 : height
    //     }
    //   }
    //   // TODO: 如果是mark需要另外计算不同位置的坐标，以保证显示在虚线框内部
    //   return {
    //     top: `${handlerType.value === 'dot' ? top : (top as number - 3)}px`,
    //     left: `${handlerType.value === 'dot' ? left : (left as number - 3)}px`,
    //     cursor:
    //       dot
    //         .split('')
    //         .reverse()
    //         .map((item) => DIRECT[item as keyof typeof DIRECT])
    //         .join('') + '-resize',
    //   }
    // }

    function handleResize(
      handleName: 'resize' | 'start' | 'stop',
      axis: IDot,
    ): CoreFnCallback {
      return (evt, { node, deltaX, deltaY }) => {
        const handleRect = node.getBoundingClientRect()

        const width = props.width + deltaX
        const height = props.height + deltaY

        const sizeChanged = width !== props.width || height !== props.height

        const fnName = `${handleName}Fn` as const
        const cb = typeof props[fnName] === 'function' ? props[fnName] : null
        const shouldSkipCb = handleName !== 'resize' && !sizeChanged
        if (cb && !shouldSkipCb) {
          console.log('resize', width, height)
          cb(evt, { node, width, height, handle: axis })
        }
      }
    }

    return {
      dots,
      slots,
      handleResize,
    }
  },
  render() {
    return h('div', {
      class: 'resize-box',
    }, [
      this.slots?.map(node => h(node)),
      this.dots.map(dot => h(FreeDomCore, {
        class: ['free-dom--handler', `free-dom--handler__${dot}`],
        stopFn: this.handleResize('stop', dot),
        startFn: this.handleResize('start', dot),
        dragFn: this.handleResize('resize', dot),
      }, () => h('i'))),
    ])
  },
})

export default resizeBox
