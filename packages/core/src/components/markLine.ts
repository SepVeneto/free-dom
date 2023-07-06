import { defineComponent, h, inject, onBeforeUnmount, reactive, ref, shallowRef } from 'vue-demi'
import { SceneToken } from '../util'

const lineType = ['xt', 'xc', 'xb', 'yl', 'yc', 'yr'] as const
type LineType = typeof lineType[number]

export default defineComponent({
  setup() {
    const SceneContext = inject<any>(SceneToken)
    const lines = shallowRef(lineType)
    const diff = ref(SceneContext.diff)
    const nodes = SceneContext.nodes as any[]
    const offsetX = ref(0)
    const offsetY = ref(0)

    const lineStatus = reactive({
      xt: {
        show: false,
        pos: 0,
      },
      xc: {
        show: false,
        pos: 0,
      },
      xb: {
        show: false,
        pos: 0,
      },
      yl: {
        show: false,
        pos: 0,
      },
      yc: {
        show: false,
        pos: 0,
      },
      yr: {
        show: false,
        pos: 0,
      },
    })

    SceneContext?.on('move', async (uuid: number) => {
      const current = nodes.find(node => node.uuid === uuid)?.node ?? {}
      clearStatus()
      nodes.forEach((node: any) => {
        if (node.uuid === uuid) return
        const _current = normalize(current._rect)
        const _target = normalize(node.node._rect)

        // lock y
        console.log(_current.top, _target.top)
        if (isNearly(_current.top, _target.top)) {
          lineStatus.xt = {
            show: true,
            pos: _target.top,
          }
          current._rect.y = _target.top
        }
        console.log(_current.top, _target.top, lineStatus.xt)
        if (isNearly(_current.bottom, _target.top)) {
          lineStatus.xt = {
            show: true,
            pos: _target.top,
          }
          current._rect.y = _target.top - _current.height
        }
        if (isNearly(_current.centerY, _target.centerY)) {
          lineStatus.xc = {
            show: true,
            pos: _target.centerY,
          }
          current._rect.y = _target.centerY - _current.height / 2
        }
        if (isNearly(_current.top, _target.bottom)) {
          lineStatus.xb = {
            show: true,
            pos: _target.bottom,
          }
          current._rect.y = _target.bottom
        }
        if (isNearly(_current.bottom, _target.bottom)) {
          lineStatus.xb = {
            show: true,
            pos: _target.bottom,
          }
          current._rect.y = _target.bottom - _current.height
        }
        // lock x
        if (isNearly(_current.left, _target.left)) {
          lineStatus.yl = {
            show: true,
            pos: _target.left,
          }
          current._rect.x = _target.left
        }
        if (isNearly(_current.right, _target.left)) {
          lineStatus.yl = {
            show: true,
            pos: _target.left,
          }
          current._rect.x = _target.left - _current.width
        }
        if (isNearly(_current.centerX, _target.centerX)) {
          lineStatus.yc = {
            show: true,
            pos: _target.centerX,
          }
          current._rect.x = _target.centerX - _current.width / 2
        }
        if (isNearly(_current.left, _target.right)) {
          lineStatus.yr = {
            show: true,
            pos: _target.right,
          }
          current._rect.x = _target.right
        }
        if (isNearly(_current.right, _target.right)) {
          lineStatus.yr = {
            show: true,
            pos: _target.right,
          }
          current._rect.x = _target.right - _current.width
        }
      })
    })
    SceneContext?.on('moveup', clearStatus)

    onBeforeUnmount(() => {
      SceneContext?.off('move')
      SceneContext?.off('moveup')
    })

    function clearStatus() {
      lineStatus.xt.show = false
      lineStatus.xc.show = false
      lineStatus.xb.show = false
      lineStatus.yl.show = false
      lineStatus.yc.show = false
      lineStatus.yr.show = false
    }
    function normalize(rect: { x: number, y: number, width: number, height: number, deltaX: number, deltaY: number }) {
      return {
        deltaX: rect.deltaX,
        deltaY: rect.deltaY,
        top: rect.y,
        bottom: rect.y + rect.height,
        left: rect.x,
        right: rect.x + rect.width,
        width: rect.width,
        height: rect.height,
        centerX: rect.x + rect.width / 2,
        centerY: rect.y + rect.height / 2,
      }
    }
    function isNearly(curr: number, target: number) {
      return Math.abs(curr - target) <= diff.value
    }

    return {
      lines,
      diff,
      lineStatus,
    }
  },
  render() {
    const _line = (line: LineType, info: typeof this.lineStatus[LineType]) => h('div', {
      style: { [line.includes('x') ? 'top' : 'left']: info.pos + 'px' },
      class: [line.includes('x') ? 'free-dom__xline' : 'free-dom__yline', 'free-dom__line'],
    })
    const _lines = this.lines
      .filter(line => this.lineStatus[line].show)
      .map(line => _line(line, this.lineStatus[line]))
    return h('div', {
      class: 'free-dom__mark-line',
    }, _lines)
  },
})
