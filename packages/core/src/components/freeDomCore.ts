import type { ExtractPropTypes, PropType } from 'vue-demi'
import { computed, defineComponent, onUnmounted, ref } from 'vue-demi'
import { useCoreData, useDefaultSlot } from '../hooks'
import { addUserSelectStyle, createRender, removeUserSelectStyle } from '../util'

function noop() { /** pass */ }

export type CoreData = {
  node: HTMLElement
  x: number
  y: number
  lastX: number
  lastY: number
  deltaX: number
  deltaY: number
}

export type CoreFnCallback = (evt: MouseEvent, coreData: CoreData) => void
export const freeDomCoreProps = {
  userSelectHack: {
    type: Boolean,
    default: true,
  },
  startFn: {
    type: Function as PropType<CoreFnCallback>,
    default: noop,
  },
  stopFn: {
    type: Function as PropType<CoreFnCallback>,
    default: noop,
  },
  dragFn: {
    type: Function as PropType<CoreFnCallback>,
    default: noop,
  },
  disabled: Boolean,
  scale: {
    type: Number,
    default: 1,
  },
}

export type FreeDomCoreProps = ExtractPropTypes<typeof freeDomCoreProps>

const freeDomCore = defineComponent({
  name: 'FreeDomCore',
  props: freeDomCoreProps,
  setup(props) {
    const dragging = ref(false)
    const coreRef = ref()
    const node = computed<HTMLElement | undefined>(() => coreRef.value?.$el || coreRef.value)
    const ownerDoc = computed(() => node.value?.ownerDocument)
    const { lastX, lastY, create } = useCoreData(node)
    const startX = ref(NaN)
    const startY = ref(NaN)
    let parentNode: Element
    let parentRect: { left: number, top: number }

    onUnmounted(() => {
      if (!ownerDoc.value) return
      if (props.userSelectHack) removeUserSelectStyle(ownerDoc.value)
      ownerDoc.value.removeEventListener('mousemove', _handleDrag)
      ownerDoc.value.removeEventListener('mouseup', _handleDragStop)
    })

    function mousedownFn(evt: MouseEvent) {
      return _handleDragstart(evt)
    }
    function mouseupFn(evt: MouseEvent) {
      _handleDragStop(evt)
    }

    function _handleDragstart(evt: MouseEvent) {
      if (
        props.disabled ||
        !evt.target ||
        !(evt.target instanceof node.value!.ownerDocument.defaultView!.Node)
      ) return
      const { x, y } = _offsetFormat(evt)

      const coreEvent = create(x, y)
      props.startFn(evt, coreEvent)

      startX.value = x
      startY.value = y
      lastX.value = x
      lastY.value = y
      dragging.value = true

      if (props.userSelectHack) addUserSelectStyle(ownerDoc.value)

      ownerDoc.value?.addEventListener('mousemove', _handleDrag)
      ownerDoc.value?.addEventListener('mouseup', _handleDragStop)
    }
    function _handleDragStop(evt: MouseEvent) {
      if (!dragging.value) return

      // 拖曳前后位置不变，跳过停止回调
      if (startX.value === lastX.value && startY.value === lastY.value) {
        // pass
      } else {
        const { x, y } = _offsetFormat(evt)
        const coreEvent = create(x, y)
        props.stopFn(evt, coreEvent)
      }
      if (props.userSelectHack) removeUserSelectStyle(ownerDoc.value)
      dragging.value = false
      lastX.value = NaN
      lastY.value = NaN
      ownerDoc.value?.removeEventListener('mousemove', _handleDrag)
      ownerDoc.value?.removeEventListener('mouseup', _handleDragStop)
    }
    function _handleDrag(evt: MouseEvent) {
      const { x, y } = _offsetFormat(evt)

      const coreEvent = create(x, y)
      props.dragFn(evt, coreEvent)

      lastX.value = x
      lastY.value = y
    }
    function _offsetFormat(evt: MouseEvent) {
      const parent = node.value?.offsetParent || ownerDoc.value!.body

      const isBody = parent === parent.ownerDocument.body

      // 缓存父组件的位置信息，优化移动坐标的计算速度
      if (!parentNode || parentNode !== parent) {
        parentNode = parent
        parentRect = isBody ? { left: 0, top: 0 } : parent.getBoundingClientRect()
      }

      const x = (evt.clientX + parent.scrollLeft - parentRect.left) / props.scale
      const y = (evt.clientY + parent.scrollTop - parentRect.top) / props.scale

      return { x, y }
    }

    return {
      coreRef,
      mousedownFn,
      mouseupFn,
    }
  },
  render() {
    const { only } = useDefaultSlot()
    const res = createRender(
      // @ts-expect-error: maybe vue2
      only,
      { ref: (el: any) => { this.coreRef = el } },
      {},
      {
        onMousedown: (evt: MouseEvent) => {
          evt.stopPropagation()
          evt.button === 0 && this.mousedownFn(evt)
        },
        onMouseup: this.mouseupFn,
      },
    )
    if (typeof res === 'function') {
      return res()
    } else {
      return res
    }
  },
})

export default freeDomCore
