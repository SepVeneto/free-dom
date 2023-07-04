import type { PropType } from 'vue'
import { computed, defineComponent, h, onUnmounted, ref } from 'vue'
import { useDefaultSlots } from '../hooks'

function noop() { /** pass */ }

const freeDomCore = defineComponent({
  name: 'FreeDomCore',
  props: {
    userSelectHack: {
      type: Boolean,
      default: true,
    },
    stopFn: {
      type: Function as PropType<(evt: MouseEvent, node: { x: number, y: number }) => boolean | void>,
      default: noop,
    },
  },
  emits: ['start'],
  setup(props, { emit }) {
    const children = useDefaultSlots()
    const lastX = ref()
    const lastY = ref()
    const dragging = ref(false)
    const domRef = ref()
    const ownerDoc = computed<Document>(() => (domRef.value.$el || domRef.value).ownerDocument)

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
      emit('start', evt)

      lastX.value = evt.clientX
      lastY.value = evt.clientY
      dragging.value = true

      if (props.userSelectHack) _addUserSelectStyle(ownerDoc.value)

      ownerDoc.value.addEventListener('mousemove', _handleDrag)
      ownerDoc.value.addEventListener('mouseup', _handleDragStop)
    }
    function _handleDragStop(evt: MouseEvent) {
      const node = { x: evt.clientX, y: evt.clientY }
      props.stopFn(evt, node)

      if (props.userSelectHack) _removeUserSelectStyle(ownerDoc.value)

      dragging.value = false
      lastX.value = NaN
      lastY.value = NaN
      ownerDoc.value.removeEventListener('mousemove', _handleDrag)
      ownerDoc.value.removeEventListener('mouseup', _handleDragStop)
    }
    function _handleDrag(evt: MouseEvent) {
      lastX.value = evt.clientX
      lastY.value = evt.clientY
    }

    return {
      children,
      domRef,
      mousedownFn,
      mouseupFn,
    }
  },
  render() {
    const node = this.children?.[0] || null
    return node
      ? h(node, {
        ref: 'domRef',
        onMousedown: this.mousedownFn,
        onMouseup: this.mouseupFn,
      })
      : null
  },
})

export default freeDomCore
