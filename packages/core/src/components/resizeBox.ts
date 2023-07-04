import { computed, defineComponent, h, inject } from 'vue'
import type { PropType } from 'vue'
import type { SceneTokenContext } from '../util'
import { SceneToken } from '../util'
import { useDefaultSlots } from '../hooks'

const Dots = ['t', 'r', 'l', 'b', 'lt', 'lb', 'rt', 'rb'] as const
type IDot = typeof Dots[number]

const resizeBox = defineComponent({
  name: 'ResizeBox',
  props: {
    scale: {
      type: [Boolean, Array] as PropType<IDot[] | boolean>,
      default: undefined,
    },
  },
  setup(props) {
    const children = useDefaultSlots()
    const SceneContext = inject<SceneTokenContext>(SceneToken, undefined)
    const canScale = computed(() => (SceneContext?.scale || props.scale))
    const dots = computed(() => {
      const _dots = SceneContext && Array.isArray(SceneContext.scale)
        ? SceneContext.scale
        : props.scale
      return Array.isArray(_dots) ? _dots : Dots
    })

    return {
      dots,
      children,
    }
  },
  render() {
    return h('div', {
      class: 'resize-box',
    }, [this.children?.map(node => h(node)), this.dots.map(dot => h('i', { class: 'free-dom__widget-dot' }))])
  },
})

export default resizeBox
