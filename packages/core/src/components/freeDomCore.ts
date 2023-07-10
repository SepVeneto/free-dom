import type { PropType } from 'vue'
import { computed, defineComponent, h, onUnmounted, ref, withModifiers } from 'vue'
import { useCoreData, useDefaultSlot } from '../hooks'

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

const freeDomCore = defineComponent({
  name: 'FreeDomCore',
  props: {
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
  },
  emits: ['start'],
  setup(props) {
    const { only } = useDefaultSlot()
    const dragging = ref(false)
    const domRef = ref()
    const node = computed<HTMLElement | undefined>(() => domRef.value?.$el || domRef.value)
    const ownerDoc = computed(() => node.value?.ownerDocument)
    const { lastX, lastY, create } = useCoreData(node)
    let parentNode: Element
    let parentRect: { left: number, top: number }

    onUnmounted(() => {
      if (!ownerDoc.value) return
      if (props.userSelectHack) _removeUserSelectStyle(ownerDoc.value)
      ownerDoc.value.removeEventListener('mousemove', _handleDrag)
      ownerDoc.value.removeEventListener('mouseup', _handleDragStop)
    })

    function mousedownFn(evt: MouseEvent) {
      return _handleDragstart(evt)
    }
    function mouseupFn(evt: MouseEvent) {
      _handleDragStop(evt)
    }
    function _addUserSelectStyle(doc?: Document) {
      if (!doc) return
      if (!doc.getElementById('free-dom-style-el')) {
        const styleEl = doc.createElement('style')
        styleEl.id = 'free-dom-style-el'
        styleEl.innerHTML = '.free-dom-transparent-selection *::selection {all: inherit;}'
        doc.getElementsByTagName('head')[0].appendChild(styleEl)
      }
      if (doc.body) doc.body.classList.add('free-dom-transparent-selection')
    }
    function _removeUserSelectStyle(doc?: Document) {
      if (!doc) return
      if (doc.body) {
        doc.body.classList.remove('free-dom-transparent-selection')
      }
      const selection = doc.getSelection()
      if (selection) {
        selection.removeAllRanges()
      }
    }
    function _handleDragstart(evt: MouseEvent) {
      const { x, y } = _offsetFormat(evt)

      const coreEvent = create(x, y)
      props.startFn(evt, coreEvent)

      lastX.value = x
      lastY.value = y
      dragging.value = true

      if (props.userSelectHack) _addUserSelectStyle(ownerDoc.value)

      ownerDoc.value?.addEventListener('mousemove', _handleDrag)
      ownerDoc.value?.addEventListener('mouseup', _handleDragStop)
    }
    function _handleDragStop(evt: MouseEvent) {
      const { x, y } = _offsetFormat(evt)

      const coreEvent = create(x, y)
      props.stopFn(evt, coreEvent)

      if (props.userSelectHack) _removeUserSelectStyle(ownerDoc.value)

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

      const x = evt.clientX + parent.scrollLeft - parentRect.left
      const y = evt.clientY + parent.scrollTop - parentRect.top

      return { x, y }
    }

    return {
      only,
      domRef,
      mousedownFn,
      mouseupFn,
    }
  },
  render() {
    return this.only
      ? h(this.only, {
        ref: 'domRef',
        onMousedown: withModifiers(this.mousedownFn, ['stop']),
        onMouseup: this.mouseupFn,
      })
      : null
  },
})

export default freeDomCore
