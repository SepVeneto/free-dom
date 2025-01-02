import type { ExtractPropTypes, PropType } from 'vue-demi'
import {
  computed,
  defineComponent,
  onMounted,
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


export const freeDomWrapProps = {
  diff: {
    type: Number,
    default: 2,
  },
  mask: freeDomProps.mask,
  autoExpand: [Number, Boolean, Object] as PropType<boolean | number | { width?: boolean | number, height?: boolean | number }>,
  manualDiff: Boolean,
  showLine: {
    type: Boolean,
    default: true,
  },
  transformScale: {
    type: Number,
    default: 1,
  },
  keyboard: Boolean,
  disabledBatch: Boolean,
  handle: freeDomProps.handle,
  width: {
    type: Number,
    default: undefined,
  },
  height: {
    type: Number,
    default: undefined,
  },
  minWidth: {
    type: Number,
    default: undefined,
  },
  minHeight: {
    type: Number,
    default: undefined,
  },
  lockAspectRatio: freeDomProps.lockAspectRatio,
  disabledDrag: freeDomProps.disabledDrag,
  disabledResize: freeDomProps.disabledResize,
  disabledSelect: freeDomProps.disabledSelect,
  scale: freeDomProps.scale,
  fixNonMonospaced: freeDomProps.fixNonMonospaced,
}

export type FreeDomWrapProps = ExtractPropTypes<typeof freeDomWrapProps>

export const FreeDomWrap = defineComponent({
  name: 'FreeDomWrap',
  props: freeDomWrapProps,
  emits: ['batch-select', 'drop', 'update:width', 'update:height'],
  setup(props, { emit }) {
    const eventBus = useEventBus()
    const nodes = ref<INode[]>([])
    const history = useOperateHistory(nodes)
    const width = ref<number | undefined>()
    const height = ref<number | undefined>()
    const rectRef = shallowRef<HTMLElement>()
    const wrapStyle = computed(() => ({
      height: height.value + 'px',
      width: width.value + 'px',
    }))

    onMounted(() => {
      if (rectRef.value) {
        const { width: w, height: h } = window.getComputedStyle(rectRef.value)
        width.value = props.width || Math.round(parseFloat(w)) || 0
        height.value = props.height || Math.round(parseFloat(h)) || 0
      }
    })

    watch([width, height, () => nodes.value.length], () => {
      runCorrect()
    })

    const selectedNodes = computed(() => nodes.value.filter(node => node.node.selected))

    const expandSize = (node: INode) => {
      let expandWidth = props.autoExpand
      let expandHeight = props.autoExpand
      if (typeof props.autoExpand === 'object') {
        expandWidth = props.autoExpand.width
        expandHeight = props.autoExpand.height
      }

      if (!expandWidth && !expandHeight) return

      const offsetWidth = typeof expandWidth === 'number' ? expandWidth : 10
      const offsetHeight = typeof expandHeight === 'number' ? expandHeight : 10

      const {
        x = 0,
        width: nw = 0,
        y = 0,
        height: nh = 0,
      } = node.node._rect
      if (expandWidth && width.value && x + nw >= width.value) {
        width.value += offsetWidth
      }
      if (expandHeight && height.value && y + nh >= height.value) {
        height.value += offsetHeight
      }
    }
    // 根据容器内元素的缩放或拖动行为计算参考线
    eventBus.on('move', (nodeId: number) => {
      const mainNode = selectedNodes.value.find(node => node.uuid === nodeId)
      if (!mainNode) return

      if (props.autoExpand) {
        expandSize(mainNode)
      }

      const { deltaX, deltaY } = mainNode.node._rect
      selectedNodes.value.forEach((node) => {
        if (node.uuid === nodeId) return

        node.node._rect.x! += deltaX || 0
        node.node._rect.y! += deltaY || 0
      })
    })

    eventBus.on('batch-select', (state, pos) => {
      state === 'end' && emit('batch-select', pos)
    })

    const selecting = ref(false)
    const mask = useMask(rectRef, props, nodes, { width, height })

    function runCorrect() {
      nodes.value.forEach(pos => {
        // 由于freedom自身有默认的最小宽高，所以优先选择容器的设置
        const minWidth = props.minWidth || pos.node.props.minWidth
        const minHeight = props.minHeight || pos.node.props.minHeight
        const { x, y, width, height } = correct(
          // @ts-expect-error: triggered after mount
          pos.node._rect,
          minWidth,
          minHeight,
        )
        // 直接对_rect赋值会导致引用丢失，进而无法触发坐标的更新
        pos.node._rect.x = x
        pos.node._rect.y = y
        pos.node._rect.width = width
        pos.node._rect.height = height
        pos.node.trigger({ x, y, w: width, h: height })
      })
    }

    function register(el: HTMLElement, uuid: number, node: INode['node']) {
      nodes.value.push({
        el,
        uuid,
        node,
      })
    }
    function remove(uuid: number) {
      const index = nodes.value.findIndex(item => item.uuid === uuid)
      nodes.value.splice(index, 1)
    }
    function checkValid(pos: IPos) {
      if (!width.value || !height.value) return false

      const { x, y, width: w, height: h } = pos
      return x! >= 0 &&
      x! + w! <= width.value &&
      y! >= 0 &&
      y! + h! <= height.value
    }
    function correct(pos: Required<IPos>, minWidth: number, minHeight: number) {
      let x = Math.max(pos.x, 0)
      let y = Math.max(pos.y, 0)
      let w = pos.width
      let h = pos.height
      const containerWidth = width.value || 0
      const containerHeight = height.value || 0
      if (pos.x + pos.width > containerWidth) {
        x = containerWidth - pos.width
        if (x < 0) {
          w = Math.max(containerWidth, minWidth)
          x = 0
        }
      }
      if (pos.y + pos.height > containerHeight) {
        y = containerHeight - pos.height
        if (y < 0) {
          h = Math.max(containerHeight, minHeight)
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
      wrapStyle,
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

    const main = createRender(
      'section',
      {
        class: 'vv-free-dom--scene',
        style: this.wrapStyle,
      },
    )(slotList)
    const wrap = (comp: any) => createRender(
      'section',
      {
        ref: 'rectRef',
        style: 'overflow: hidden;',
      },
      {},
      {
        onMousedown: this.mask.handleMousedown,
        onMousemove: this.mask.handleMousemove,
        ondrop: (evt) => {
          this.$emit('drop', evt)
        },
        ondragover: (evt) => {
          evt.preventDefault()
        },
      }
    )(comp)
    return wrap(main)
  },
})
