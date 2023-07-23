import type { ExtractPropTypes } from 'vue-demi'
import { computed, defineComponent, onMounted, provide, reactive, ref, shallowRef, toRefs, watchEffect } from 'vue-demi'
import { SceneToken, createRender } from '../util'
import markLine from './markLine'
import { useDefaultSlot, useEventBus } from '../hooks'
import { freeDomProps } from './freeDom'

export const freeDomWrapProps = {
  width: {
    type: Number,
    default: undefined,
  },
  height: {
    type: Number,
    default: undefined,
  },
  diff: {
    type: Number,
    default: 2,
  },
  showLine: {
    type: Boolean,
    default: true,
  },
  minWidth: freeDomProps.minWidth,
  minHeight: freeDomProps.minHeight,
  lockAspectRatio: freeDomProps.lockAspectRatio,
  disabledDrag: freeDomProps.disabledDrag,
  disabledResize: freeDomProps.disabledResize,
  scale: freeDomProps.scale,
  fixNonMonospaced: freeDomProps.fixNonMonospaced,
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
    const { slots } = useDefaultSlot()
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
      x! + w! <= width.value &&
      y! >= 0 &&
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
    const style = computed(() => ({
      width: `${props.width}px`,
      height: `${props.height}px`,
    }))

    return {
      rectRef,
      style,
      slots,
    }
  },
  render() {
    const marklineComp = createRender(markLine, {}, { showLine: this.showLine })
    const slots = [this.slots, marklineComp]
    return createRender(
      'selection',
      {
        ref: 'rectRef',
        class: 'vv-free-dom--scene',
        style: this.style,
      },
    )(slots)
  },
})
