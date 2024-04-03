import type { GridLayoutProps } from '../components/gridLayout'

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

export function addUserSelectStyle(doc?: Document) {
  if (!doc) return
  if (!doc.getElementById('free-dom-style-el')) {
    const styleEl = doc.createElement('style')
    styleEl.id = 'free-dom-style-el'
    styleEl.innerHTML = '.free-dom-transparent-selection *::selection {all: inherit;}'
    doc.getElementsByTagName('head')[0].appendChild(styleEl)
  }
  if (doc.body) doc.body.classList.add('free-dom-transparent-selection')
}

export function removeUserSelectStyle(doc?: Document) {
  if (!doc) return
  if (doc.body) {
    doc.body.classList.remove('free-dom-transparent-selection')
  }
  const selection = doc.getSelection()
  if (selection) {
    selection.removeAllRanges()
  }
}

export type PositionParams = {
  margin: GridLayoutProps['margin']
  cols: GridLayoutProps['cols']
  rowHeight: GridLayoutProps['rowHeight']
  maxRows: GridLayoutProps['maxRows']
  containerPadding: GridLayoutProps['containerPadding'] & GridLayoutProps['margin']
  width: GridLayoutProps['width']
}
// xy坐标转换成gird的单位
export function calcXY(
  params: PositionParams,
  left: number,
  top: number,
  w: number,
  h: number,
) {
  const { margin, cols, rowHeight, maxRows } = params
  const colWidth = calGridColsWidth(params)

  let x = Math.round((left - margin[0]) / (colWidth + margin[0]))
  let y = Math.round((top - margin[1] / (rowHeight + margin[1])))
  x = clamp(x, 0, cols - w)
  y = clamp(y, 0, maxRows - h)

  return { x, y }
}

function calGridColsWidth(params: PositionParams) {
  const { margin, containerPadding, width, cols } = params

  const widthWithoutLayout = width - margin[0] * (cols - 1) - containerPadding[0] * 2
  return widthWithoutLayout / cols
}
