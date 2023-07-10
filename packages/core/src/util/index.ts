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
  x: number,
  y: number,
) {
  const oldX = config.x
  const oldY = config.y

  if (typeof x === 'number') config.x = x
  if (typeof y === 'number') config.y = y

  // TODO: 碰撞检测

  config.x = oldX
  config.y = oldY
  return layout
}
