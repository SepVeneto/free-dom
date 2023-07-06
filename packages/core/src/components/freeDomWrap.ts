import type { ExtractPropTypes, PropType } from 'vue-demi'
import { defineComponent, h, provide, reactive, ref, shallowRef, toRefs } from 'vue-demi'
import { useElementBounding } from '@vueuse/core'
import { SceneToken } from '../util'
import markLine from './markLine'
import { useEventBus } from '../hooks'

const Dots = ['t', 'r', 'l', 'b', 'lt', 'lb', 'rt', 'rb'] as const
type IDot = typeof Dots[number]

export const freeDomWrapProps = {
  mode: {
    type: String as PropType<'grid' | 'free'>,
    default: 'free',
  },
  absolute: {
    type: Boolean,
    default: undefined,
  },
  preview: Boolean,
  move: Boolean,
  scale: [Boolean, Array] as PropType<IDot[] | boolean>,
  diff: {
    type: Number,
    default: 3,
  },
  handler: {
    type: String as PropType<'dot' | 'mark'>,
    default: undefined,
  },
  diagonal: {
    type: Boolean,
    default: undefined,
  },
  grid: {
    type: Object as PropType<[number, number]>,
    default: undefined,
  },
}

export type FreeDomWrapProps = ExtractPropTypes<typeof freeDomWrapProps>
export type IPos = {
  x?: number
  y?: number
  width?: number
  height?: number
}
export type INodeInfo = {
  _rect: IPos
}
export type INode = {
  uuid: number
  node: INodeInfo
}

export const FreeDomWrap = defineComponent({
  name: 'FreeDomWrap',
  props: freeDomWrapProps,
  setup(props) {
    const eventBus = useEventBus()
    const rectRef = shallowRef(null)
    const rect = useElementBounding(rectRef)
    const nodes = ref<INode[]>([])

    function register(uuid: number, node: INodeInfo) {
      nodes.value.push({ uuid, node })
    }
    function checkValid(pos: IPos) {
      const { x, y, width, height } = pos
      return x! >= 0 &&
      x! + width! <= rect.width.value &&
      y! >= 0 &&
      y! + height! <= rect.height.value
    }

    provide(
      SceneToken,
      reactive({
        ...toRefs(props),
        nodes,

        register,
        checkValid,
        on: eventBus.on,
        off: eventBus.off,
        emit: eventBus.emit,
      }),
    )

    return {
      rectRef,
    }
  },
  render() {
    const defaultSlot =
      typeof this.$slots.default === 'function'
        ? this.$slots.default()
        : this.$slots.default

    return h('section', {
      ref: 'rectRef',
    }, [defaultSlot, h(markLine)])
  },
})
