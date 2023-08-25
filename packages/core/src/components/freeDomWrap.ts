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
  handle: freeDomProps.handle,
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
  trigger: (pos: { x: number, y: number, w: number, h: number }) => void
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
        const h = rectRef.value?.clientHeight
        const w = rectRef.value?.clientWidth
        if (!props.width) width.value = w || 0
        if (!props.height) height.value = h || 0
      }
      nodes.value.forEach(pos => {
        // @ts-expect-error: trigger after mounted
        const { x, y, width, height } = correct(pos.node._rect)
        // 直接对_rect赋值会导致引用丢失，进而无法触发坐标的更新
        pos.node._rect.x = x
        pos.node._rect.y = y
        pos.node._rect.width = width
        pos.node._rect.height = height
        pos.node.trigger({ x, y, w: width, h: height })
      })
    })

    function register(uuid: number, node: INodeInfo) {
      nodes.value.push({ uuid, node })
    }
    function remove(uuid: number) {
      const index = nodes.value.findIndex(item => item.uuid === uuid)
      nodes.value.splice(index, 1)
    }
    function checkValid(pos: IPos) {
      const { x, y, width: w, height: h } = pos
      return x! >= 0 &&
      // @ts-expect-error: trigger after mounted
      x! + w! <= width.value &&
      y! >= 0 &&
      // @ts-expect-error: trigger after mounted
      y! + h! <= height.value
    }
    function correct(pos: Required<IPos>) {
      let x = Math.max(pos.x, 0)
      let y = Math.max(pos.y, 0)
      let w = pos.width
      let h = pos.height
      // @ts-expect-error: trigger after mounted
      if (pos.x + pos.width > width.value) {
      // @ts-expect-error: trigger after mounted
        x = width.value - pos.width
        if (x < 0) {
        // @ts-expect-error: trigger after mounted
          w = width.value
          x = 0
        }
      }
      // @ts-expect-error: trigger after mounted
      if (pos.y + pos.height > height.value) {
      // @ts-expect-error: trigger after mounted
        y = height.value - pos.height
        if (y < 0) {
        // @ts-expect-error: trigger after mounted
          h = height.value
          y = 0
        }
      }
      return {
        x,
        y,
        width: w,
        height: h,
      }
    }

    provide(
      SceneToken,
      reactive({
        ...toRefs(props),
        nodes,
        width,
        height,

        register,
        remove,
        checkValid,
        correct,
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
    const marklineComp = createRender(markLine, {}, { showLine: this.showLine })()
    const slots = [this.slots, marklineComp]
    return createRender(
      'section',
      {
        ref: 'rectRef',
        class: 'vv-free-dom--scene',
        style: this.style,
      },
    )(slots)
  },
})
