import type { GridLayoutConfig } from '../components/gridLayout'
export * from './EventBus'
export * from './tokens'

export function clamp(value: number, min: number, max = Infinity): number {
  return Math.max(Math.min(value, max), min)
}

export function snapToGrid(grid: [number, number], pendingX: number, pendingY: number) {
  const x = Math.round(pendingX / grid[0]) * grid[0]
  const y = Math.round(pendingY / grid[1]) * grid[1]
  return [x, y]
}

export function moveElement(
  layout: GridLayoutConfig,
  config: GridLayoutConfig[number],
  x?: number,
  y?: number,
  isUserAction?: boolean,
) {
  if (config.y === y && config.x === x) return layout

  const oldX = config.x
  const oldY = config.y

  if (typeof x === 'number') config.x = x
  if (typeof y === 'number') config.y = y
  config.moved = true

  const moveup = typeof y === 'number' && oldY >= y

  // TODO: 碰撞检测
  const collisions = layout.filter(l => collides(l, config))
  const hasCollsions = collisions.length > 0

  collisions.forEach(collision => {
    if (collision.moved) return

    console.log(isUserAction)
    if (isUserAction) {
      isUserAction = false

      const fakeItem = {
        x: collision.x,
        y: Math.max(config.y - collision.h, 0),
        w: collision.w,
        h: collision.h,
        i: '-1',
      }

      console.log('trigger')
      if (!getFirstCollision(layout, fakeItem)) {
        layout = moveElement(layout, collision, undefined, collision.y, isUserAction)
        return
      }
    }
    layout = moveElement(layout, collision, undefined, collision.y + 1, isUserAction)
  })

  // config.x = oldX
  // config.y = oldY
  console.log(JSON.parse(JSON.stringify(layout)))
  return layout
}

function getFirstCollision(layout: GridLayoutConfig, layoutItem: GridLayoutConfig[number]) {
  return layout.filter(item => collides(item, layoutItem))?.[0]
}
function collides(l1: GridLayoutConfig[number], l2: GridLayoutConfig[number]) {
  if (l1.i === l2.i) return false
  else if (l1.x + l1.w <= l2.x) return false
  else if (l1.y + l1.h <= l2.y) return false
  else if (l2.x + l2.w <= l1.x) return false
  else if (l2.y + l2.h <= l1.y) return false
  else return true
}

// TODO: variable
export function calcXY(props: any, left: number, top: number, cellWidth: number, w: number, h: number) {
  let x = Math.round(left / cellWidth)
  let y = Math.round(top / 30)
  x = clamp(x, 0, 12 - w)
  y = clamp(y, 0, Infinity - h)
  return { x, y }
}
