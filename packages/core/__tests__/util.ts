import type { VueWrapper } from '@vue/test-utils'

export function simulateMoveFromTo(
  node: VueWrapper,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
) {
  const dnd = node.findComponent({ name: 'FreeDomCore' })
  dnd.trigger('mousedown', { clientX: fromX, clientY: fromY })

  const doc = node.element.ownerDocument
  const mousemove = new MouseEvent('mousemove', {
    clientX: toX,
    clientY: toY,
  })
  doc.dispatchEvent(mousemove)

  dnd.trigger('mouseup')
}
