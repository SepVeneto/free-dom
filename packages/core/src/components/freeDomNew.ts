import { useDefaultSlot } from '../hooks'
import { defineComponent, h } from 'vue'
import FreedomCore from './freeDomCore'
import ResizeBox from './resizeBox'

const freeDom = defineComponent({
  name: 'FreeDom',
  setup() {
    const { slots } = useDefaultSlot()

    return {
      slots,
    }
  },
  render() {
    // console.log(this.children)
    const resizeNode = h(ResizeBox, {}, () => this.slots)
    return h(FreedomCore, {
      class: 'draggable',
      stopFn: (e, node) => {
        console.log(e, node)
      },
    }, () => resizeNode)
  },
})

export default freeDom
