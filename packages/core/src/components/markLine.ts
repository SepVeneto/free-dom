import { computed, defineComponent, h, inject, onBeforeUnmount, reactive, shallowRef } from 'vue-demi'
import { SceneToken } from '../util'
import type { SceneTokenContext } from '../util'

const lineType = ['xt', 'xc', 'xb', 'yl', 'yc', 'yr'] as const
type LineType = typeof lineType[number]

export default defineComponent({
  props: {
    showLine: Boolean,
  },
  setup() {
    const SceneContext = inject<SceneTokenContext>(SceneToken)!
    const lines = shallowRef(lineType)
    const diff = computed(() => SceneContext.diff / SceneContext.transformScale)
    const nodes = SceneContext.nodes

    const staticNodes = computed(() => nodes.filter(node => !node.node.selected))

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

    const runConstraints = (uuid: number, withoutConstraint?: boolean) => {
      const current = nodes.find(node => node.uuid === uuid)?.node
      if (!current) return
      clearStatus()
      staticNodes.value.forEach((node: any) => {
        if (node.uuid === uuid) return
        // @ts-expect-error: without undefined
        const _current = normalize(current._rect)
        const _target = normalize(node.node._rect)

        // lock y
        if (isNearly(_current.top, _target.top, withoutConstraint)) {
          lineStatus.xt = {
            show: true,
            pos: _target.top,
          }
          current._rect.y = _target.top
        }
        if (isNearly(_current.bottom, _target.top, withoutConstraint)) {
          lineStatus.xt = {
            show: true,
            pos: _target.top,
          }
          current._rect.y = _target.top - _current.height
        }
        if (isNearly(_current.centerY, _target.centerY, withoutConstraint)) {
          lineStatus.xc = {
            show: true,
            pos: _target.centerY,
          }
          current._rect.y = _target.centerY - _current.height / 2
        }
        if (isNearly(_current.top, _target.bottom, withoutConstraint)) {
          lineStatus.xb = {
            show: true,
            pos: _target.bottom,
          }
          current._rect.y = _target.bottom
        }
        if (isNearly(_current.bottom, _target.bottom, withoutConstraint)) {
          lineStatus.xb = {
            show: true,
            pos: _target.bottom,
          }
          current._rect.y = _target.bottom - _current.height
        }
        // lock x
        if (isNearly(_current.left, _target.left, withoutConstraint)) {
          lineStatus.yl = {
            show: true,
            pos: _target.left,
          }
          current._rect.x = _target.left
        }
        if (isNearly(_current.right, _target.left, withoutConstraint)) {
          lineStatus.yl = {
            show: true,
            pos: _target.left,
          }
          current._rect.x = _target.left - _current.width
        }
        if (isNearly(_current.centerX, _target.centerX, withoutConstraint)) {
          lineStatus.yc = {
            show: true,
            pos: _target.centerX,
          }
          current._rect.x = _target.centerX - _current.width / 2
        }
        if (isNearly(_current.left, _target.right, withoutConstraint)) {
          lineStatus.yr = {
            show: true,
            pos: _target.right,
          }
          current._rect.x = _target.right
        }
        if (isNearly(_current.right, _target.right, withoutConstraint)) {
          lineStatus.yr = {
            show: true,
            pos: _target.right,
          }
          current._rect.x = _target.right - _current.width
        }
      })
    }

    SceneContext?.on('move', runConstraints)
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
    function isNearly(curr: number, target: number, withoutConstraint?: boolean) {
      const _diff = withoutConstraint ? 0 : diff.value
      return Math.abs(curr - target) <= _diff
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
      class: [line.includes('x') ? 'vv-free-dom--xline' : 'vv-free-dom--yline', 'vv-free-dom--line'],
    })
    const _lines = this.showLine
      ? this.lines
        .filter(line => this.lineStatus[line].show)
        .map(line => _line(line, this.lineStatus[line]))
      : []
    return h('div', {
      class: 'vv-free-dom--markline',
    }, _lines)
  },
})
