import type { ExtractPropTypes } from 'vue-demi'
import {
  computed,
  defineComponent,
  provide,
  reactive,
  ref,
  shallowRef,
  toRefs,
  watch,
} from 'vue-demi'
import { SceneToken, createRender } from '../util'
import markLine from './markLine'
import { useDefaultSlot, useEventBus, useMask, useOperateHistory } from '../hooks'
import { freeDomProps } from './freeDom'
import type { INode, IPos } from '../types'
import { useElementBounding } from '@vueuse/core'

export const freeDomWrapProps = {
  diff: {
    type: Number,
    default: 2,
  },
  showLine: {
    type: Boolean,
    default: true,
  },
  transformScale: {
    type: Number,
    default: 1,
  },
  keyboard: Boolean,
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

export const FreeDomWrap = defineComponent({
  name: 'FreeDomWrap',
  props: freeDomWrapProps,
  setup(props) {
    const eventBus = useEventBus()
    const nodes = ref<INode[]>([])
    const history = useOperateHistory(nodes)
    const width = ref(0)
    const height = ref(0)
    const rectRef = shallowRef<HTMLElement>()
    const wrapRect = useElementBounding(rectRef)

    watch([wrapRect.width, wrapRect.height], ([w, h]) => {
      width.value = w
      height.value = h

      if (!w || !h) return

      runCorrect()
    })

    const selectedNodes = computed(() => nodes.value.filter(node => node.node.selected))
    eventBus.on('move', (nodeId: number) => {
      const mainNode = selectedNodes.value.find(node => node.uuid === nodeId)
      if (!mainNode) return

      const { deltaX, deltaY } = mainNode.node._rect
      selectedNodes.value.forEach(node => {
        if (node.uuid === nodeId) return

        node.node._rect.x! += deltaX || 0
        node.node._rect.y! += deltaY || 0
      })
    })

    const selecting = ref(false)
    const mask = useMask(rectRef, nodes)

    function runCorrect() {
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
    }

    function register(uuid: number, node: INode['node']) {
      nodes.value.push({
        uuid,
        node,
      })
    }
    function remove(uuid: number) {
      const index = nodes.value.findIndex(item => item.uuid === uuid)
      nodes.value.splice(index, 1)
    }
    function checkValid(pos: IPos) {
      const { x, y, width: w, height: h } = pos
      return x! >= 0 &&
      x! + w! <= width.value &&
      y! >= 0 &&
      y! + h! <= height.value
    }
    function correct(pos: Required<IPos>) {
      let x = Math.max(pos.x, 0)
      let y = Math.max(pos.y, 0)
      let w = pos.width
      let h = pos.height
      if (pos.x + pos.width > width.value) {
        x = width.value - pos.width
        if (x < 0) {
          w = width.value
          x = 0
        }
      }
      if (pos.y + pos.height > height.value) {
        y = height.value - pos.height
        if (y < 0) {
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
    function clearSelectState() {
      selectedNodes.value.forEach(node => { node.node.selected = false })
    }

    provide(
      SceneToken,
      reactive({
        ...toRefs(props),
        nodes,
        width,
        height,
        history,

        clearSelectState,
        register,
        remove,
        checkValid,
        correct,
        on: eventBus.on,
        off: eventBus.off,
        emit: eventBus.emit,
      }),
    )
    return {
      rectRef,
      selecting,
      mask,
      history,
    }
  },
  render() {
    const { slots } = useDefaultSlot()
    const marklineComp = createRender(markLine, {}, { showLine: this.showLine })()

    const slotList = [
      this.mask.selecting && this.mask.renderMask(),
      slots,
      marklineComp,
    ]

    return createRender(
      'section',
      {
        ref: 'rectRef',
        class: 'vv-free-dom--scene',
      },
      {
        onMousedown: this.mask.handleMousedown,
        onMousemove: this.mask.handleMousemove,
      },
    )(slotList)
  },
})
