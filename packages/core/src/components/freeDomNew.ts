import { useDefaultSlots } from '../hooks'
import { defineComponent, h } from 'vue'
import FreedomCore from './freeDomCore'
import ResizeBox from './resizeBox'

const freeDom = defineComponent({
  name: 'FreeDom',
  setup() {
    const children = useDefaultSlots()

    return {
      children,
    }
  },
  render() {
    const node = this.children?.[0] || null
    console.log(this.children)
    const resizeNode = h(ResizeBox, {}, () => node)
    return h(FreedomCore, {
      class: 'draggable',
      stopFn: (e, node) => {
        console.log(e, node)
      },
    }, () => resizeNode)
  },
})

export default freeDom
