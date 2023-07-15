import type { ExtractPropTypes, PropType } from 'vue-demi'
import { defineComponent, h, provide, reactive, ref, shallowRef, toRefs } from 'vue-demi'
import { SceneToken } from '../util'
import markLine from './markLine'
import { useEventBus } from '../hooks'
import { onMounted, watchEffect } from 'vue'

const Dots = ['t', 'r', 'l', 'b', 'lt', 'lb', 'rt', 'rb'] as const
type IDot = typeof Dots[number]

export const freeDomWrapProps = {
  width: {
    type: Number,
    default: undefined,
  },
  height: {
    type: Number,
    default: undefined,
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
    const rectRef = shallowRef<HTMLElement>()
    const nodes = ref<INode[]>([])
    const width = ref(props.width)
    const height = ref(props.height)

    watchEffect(() => {
      width.value = props.width
    })
    watchEffect(() => {
      height.value = props.height
    })
    onMounted(() => {
      if (!props.width || !props.height) {
        if (!rectRef.value) console.warn('[free-dom] cannot find element, width or height may be set to 0')
        const { width: w, height: h } = rectRef.value?.getBoundingClientRect() || {}
        if (!props.width) width.value = w || 0
        if (!props.height) height.value = h || 0
      }
    })

    function register(uuid: number, node: INodeInfo) {
      nodes.value.push({ uuid, node })
    }
    function checkValid(pos: IPos) {
      const { x, y, width: w, height: h } = pos
      return x! >= 0 &&
      // @ts-expect-error: execute after mounted
      x! + w! <= width.value &&
      y! >= 0 &&
      // @ts-expect-error: execute after mounted
      y! + h! <= height.value
    }

    provide(
      SceneToken,
      reactive({
        ...toRefs(props),
        nodes,
        width,
        height,

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
      class: 'vv-free-dom--scene',
    }, [defaultSlot, h(markLine)])
  },
})
