import { defineComponent, shallowRef, h, provide, reactive, toRefs } from "vue-demi"
import { useElementBounding } from '@vueuse/core'
import { SceneToken } from '../util'
import markLine from "./markLine"

export const FreeDomWrap = defineComponent({
  name: 'FreeDomWrap',
  props:{
    move: Boolean,
    scale: Boolean,
    diff: {
      type: Number,
      default: 3,
    }
  },
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

    provide(
      SceneToken,
      reactive({
        ...toRefs(props),
        nodes,

        register,
        checkValid
      })
    )

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
