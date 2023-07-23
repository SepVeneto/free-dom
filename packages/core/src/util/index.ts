export * from './EventBus'
export * from './tokens'
export * from './render'

const isProduction = process.env.NODE_ENV === 'production'

export function clamp(value: number, min: number, max = Infinity): number {
  return Math.max(Math.min(value, max), min)
}

export function snapToGrid(grid: [number, number], pendingX: number, pendingY: number) {
  const x = Math.round(pendingX / grid[0]) * grid[0]
  const y = Math.round(pendingY / grid[1]) * grid[1]
  return [x, y]
}

export function log(...args: any[]) {
  if (isProduction) return
  console.log('[grid-layout]', ...args)
}
