import { defineComponent, shallowRef, h, provide } from "vue-demi"
import { useElementBounding } from '@vueuse/core'
import { SceneToken } from './tokens'

export default defineComponent({
  name: 'FreeDomWrap',
  setup(props, { expose }) {
    const rectRef = shallowRef(null)
    const rect = useElementBounding(rectRef)
    const nodes = []

    function register(node: any) {
      nodes.push(node)
    }
    function checkValid(pos: any) {
      const { x, y, width, height } = pos;
      return x >= 0 && x + width <= rect.width.value && y >= 0 && y + height <= rect.height.value
    }

    provide(SceneToken, {
      register,
      checkValid
    })

    expose({
      register
    })

    return {
      rectRef
    }
  },
  render() {
    const defaultSlot =
      typeof this.$slots.default === 'function'
        ? this.$slots.default()
        : this.$slots.default

    return h('section', {
      ref: 'rectRef',
      style: 'width: 600px'
    }, defaultSlot)
  }
})
