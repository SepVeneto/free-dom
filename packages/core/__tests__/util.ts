import type { VueWrapper } from '@vue/test-utils'

export async function simulateMoveFromTo(
  node: VueWrapper,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  shiftKey?: boolean,
) {
  const dnd = node.findComponent({ name: 'FreeDomCore' })
  const doc = node.element.ownerDocument
  dnd.trigger('mousedown', { clientX: fromX, clientY: fromY })
  const mousemove = new MouseEvent('mousemove', {
    clientX: toX,
    clientY: toY,
    shiftKey,
  })
  doc.dispatchEvent(mousemove)
  dnd.trigger('mouseup')
}
