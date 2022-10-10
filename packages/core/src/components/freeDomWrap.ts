import { defineComponent, shallowRef, h, provide, reactive, toRefs, ExtractPropTypes, PropType } from "vue-demi"
import { useElementBounding } from '@vueuse/core'
import { SceneToken } from '../util'
import markLine from "./markLine"

const Dots = ['t', 'r', 'l', 'b', 'lt', 'lb', 'rt', 'rb'] as const
type IDot = typeof Dots[number]

export const freeDomWrapProps = {
  preview: Boolean,
  move: Boolean,
  scale: [Boolean, Array] as PropType<IDot[] | boolean>,
  diff: {
    type: Number,
    default: 3,
  }
}

export type FreeDomWrapProps = ExtractPropTypes<typeof freeDomWrapProps>
export type INode = {
  uuid: string
  node: INodeInfo
}
export type INodeInfo = {
  _rect: IPos
  trigger: () => void
}
export type IPos = {
  x: number
  y: number
  width: number
  height: number
}

export const FreeDomWrap = defineComponent({
  name: 'FreeDomWrap',
  props: freeDomWrapProps,
  setup(props) {
    const rectRef = shallowRef(null)
    const rect = useElementBounding(rectRef)
    const nodes = reactive<INode[]>([])

    function register(uuid: string, node: INodeInfo) {
      nodes.push({ uuid, node })
    }
    function checkValid(pos: IPos) {
      const { x, y, width, height } = pos;
      return x >= 0 && x + width <= rect.width.value && y >= 0 && y + height <= rect.height.value
    }

    provide(
      SceneToken,
      reactive({
        ...toRefs(props),
        nodes,

        register,
        checkValid
      })
    )

    return {
      rectRef
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
  }
})
