import { h, defineComponent, shallowRef, ref, reactive, inject } from "vue-demi";
import EventBus from "./EventBus";
import { SceneToken } from "./tokens";
import './line.scss'

const lineType = ['xt', 'xc', 'xb', 'yl', 'yc', 'yr'] as const
type LineType = typeof lineType[number]

export default defineComponent({
  setup() {
    const SceneContext = inject<any>(SceneToken)
    const lines = shallowRef(lineType)
    const diff = ref(3)
    const lineStatus = reactive({
      xt: false,
      xc: false,
      xb: false,
      yl: false,
      yc: false,
      yr: false,
    })
    const nodes = SceneContext.nodes as any[]
    const xt = shallowRef()
    const xc = shallowRef()
    const xb = shallowRef()
    const yl = shallowRef()
    const yc = shallowRef()
    const yr = shallowRef()

    EventBus.on('move', (uuid: string) => {
      const current = nodes.find(node => node.uuid === uuid)?.node ?? {}
      nodes.forEach((node: any) => {
        if (node.uuid === uuid) return;
        const _current = normalize(current._rect)
        const _target = normalize(node.node._rect)
        lineStatus.xt = isNearly(_current.top, _target.top) || isNearly(_current.bottom, _target.top)
        // lineStatus.xc = false;
        // lineStatus.xb = isNearly(_current.top, _target.bottom) && isNearly(_current.bottom, _target.bottom)
        // lineStatus.yl = isNearly(_current.left, _target.left) && isNearly(_current.right, _target.left)
        // lineStatus.yr = isNearly(_current.left, _target.right) && isNearly(_current.right, _target.right)
        if (lineStatus.xt && xt.value) {
          xt.value.style.top = _target.top + 'px'
          current._rect.y = _target.top
        }
      })
    })

    function normalize(rect: { x: number, y: number, width: number, height: number }) {
      return {
        top: rect.y,
        bottom: rect.y + rect.height,
        left: rect.x,
        right: rect.x + rect.width
      }
    }
    function isNearly(curr: number, target: number) {
      return Math.abs(curr - target) <= diff.value
    }

    return {
      lines,
      diff,
      lineStatus,

      xt,
      xc,
      xb,
      yl,
      yc,
      yr
    }
  },
  render() {
    const _line = (line: LineType) => h('div', {
      ref: line,
      class: [line.includes('x') ? 'xline' : 'yline', 'line']
    })
    const _lines = this.lines.filter(line => this.lineStatus[line]).map(line => h('div', null, _line(line)))
    return h('div', {
      class: 'mark-line',
    }, _lines)
  }
})
