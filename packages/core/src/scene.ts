import { defineComponent, shallowRef, h, provide } from "vue-demi"
import { useElementBounding } from '@vueuse/core'
import { SceneToken } from './tokens'

export default defineComponent({
  name: 'FreeDomWrap',
  setup(props, { expose }) {
    const rectRef = shallowRef()
    const rect = useElementBounding(rectRef)
    const nodes = []

    function register(node: any) {
      nodes.push(node)
    }

    provide(SceneToken, {
      register
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
      ref: this.rectRef
    }, defaultSlot)
  }
})
