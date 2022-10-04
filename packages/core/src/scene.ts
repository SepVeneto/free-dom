import { defineComponent, shallowRef, h, provide, reactive } from "vue-demi"
import { useElementBounding } from '@vueuse/core'
import { SceneToken } from './tokens'
import markLine from "./markLine"

export default defineComponent({
  name: 'FreeDomWrap',
  setup(props, { expose }) {
    const rectRef = shallowRef(null)
    const rect = useElementBounding(rectRef)
    const nodes = reactive<any[]>([])

    function register(uuid: string, node: any) {
      nodes.push({ uuid, node })
    }
    function checkValid(pos: any) {
      const { x, y, width, height } = pos;
      return x >= 0 && x + width <= rect.width.value && y >= 0 && y + height <= rect.height.value
    }

    provide(SceneToken, {
      nodes,

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
    }, [defaultSlot, h(markLine)])
  }
})
