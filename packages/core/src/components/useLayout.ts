import { computed, ref, shallowRef, watchEffect } from 'vue-demi'
import type { GridLayoutConfig, GridLayoutProps } from './gridLayout'
import type { GridItemProps } from './gridItem'
import type { CoreFnCallback } from './freeDomCore'
import type { ResizeFnCallback } from './resizeDomCore'
import { clamp } from '../util'

export function useLayout(props: GridLayoutProps) {
  const layout = shallowRef(props.modelValue)
  watchEffect(() => {
    layout.value = props.modelValue
  })
  const cellWidth = computed(() => (
    (props.width - margin.value[0] * (cols.value - 1) - (containerPadding.value?.[0] || margin.value[0]) * 2)) / props.cols,
  )
  const cols = computed(() => props.cols)
  const rowHeight = computed(() => props.rowHeight)
  const margin = computed(() => props.margin)
  const maxRows = computed(() => props.maxRows)
  const containerPadding = computed(() => props.containerPadding)

  function getItem(key: string) {
    return layout.value.find(item => item.i === key)
  }
  function getFull() {
    return layout.value
  }

  function _moveElement(
    config: GridLayoutConfig[number],
    x?: number,
    y?: number,
    isUserAction?: boolean,
  ) {
    let _layout = layout.value
    if (config.y === y && config.x === x) return _layout

    console.log(
      `Moving element ${config.i} to [${String(x)},${String(y)}] from [${config.x},${config.y}]`,
    )

    const oldX = config.x
    const oldY = config.y

    if (typeof x === 'number') config.x = x
    if (typeof y === 'number') config.y = y
    config.moved = true

    const sortable = _sortLayoutItems(_layout)

    // const moveup = typeof y === 'number' && oldY >= y

    // TODO: 碰撞检测
    const collisions = sortable.filter(l => _collides(l, config))
    const hasCollsions = collisions.length > 0

    if (hasCollsions && !props.collision) {
      config.x = oldX
      config.y = oldY
      config.moved = false
      return _layout
    }

    collisions.forEach(collision => {
      console.log(
        `Resolving collision between ${config.i} at [${config.x},${config.y}] and ${collision.i} at [${collision.x},${collision.y}]`,
        collision.moved, collision.i)
      if (collision.moved) return

      if (isUserAction) {
        isUserAction = false

        const fakeItem = {
          x: collision.x,
          y: Math.max(config.y - collision.h, 0),
          w: collision.w,
          h: collision.h,
          i: '-1',
        }

        if (!_getFirstCollision(_layout, fakeItem)) {
          console.log(
            `Doing reverse collision on ${collision.i} up to [${fakeItem.x},${fakeItem.y}].`,
          )
          _layout = _moveElement(collision, undefined, collision.y, isUserAction)
          return
        }
      }
      _layout = _moveElement(collision, undefined, collision.y + 1, isUserAction)
    })

    // config.x = oldX
    // config.y = oldY
    return _layout
  }

  function moveTo(item: GridLayoutConfig[number], x?: number, y?: number) {
    const isUserAction = true
    const _layout = _moveElement(item, x, y, isUserAction)
    layout.value = _normalize(_layout)
    return layout.value
  }
  function resizeTo(item: GridLayoutConfig[number], w: number, h: number) {
    let hasCollisions = false
    if (!props.collision) {
      const collisions = layout.value.filter(l => _collides(l, { ...item, w, h }))
      hasCollisions = collisions.length > 0

      // 禁用碰撞时，如果缩放位置周围有其它元素
      if (hasCollisions) {
        let leastX = Infinity
        let leastY = Infinity
        // 记录下离缩放位置最近的元素的坐标
        collisions.forEach(collision => {
          if (collision.x > item.x) leastX = Math.min(collision.x, leastX)
          if (collision.y > item.y) leastY = Math.min(collision.y, leastY)
        })
        // 缩放元素的宽高 = 最近的碰撞元素的坐标 - 缩放元素的坐标
        // 即填满两坐标之间的区域
        if (Number.isFinite(leastX)) item.w = leastX - item.x
        if (Number.isFinite(leastY)) item.h = leastY - item.y
      }
    }
    if (!hasCollisions) {
      item.w = w
      item.h = h
    }
    layout.value = _normalize([...layout.value])
  }

  // 以在y轴上的距离升序排列
  function _sortLayoutItems(layout: GridLayoutConfig) {
    return layout.slice(0).sort((a, b) => {
      if (a.y > b.y || (a.y === b.y && a.x > b.x)) {
        return 1
      } else if (a.y === b.y && a.x === b.x) {
        return 0
      } else {
        return -1
      }
    })
  }
  function _collides(l1: GridLayoutConfig[number], l2: GridLayoutConfig[number]) {
    if (l1.i === l2.i) return false
    else if (l1.x + l1.w <= l2.x) return false
    else if (l1.y + l1.h <= l2.y) return false
    else if (l2.x + l2.w <= l1.x) return false
    else if (l2.y + l2.h <= l1.y) return false
    else return true
  }
  // 第一个触发碰撞的网格
  function _getFirstCollision(layout: GridLayoutConfig, layoutItem: GridLayoutConfig[number]) {
    for (let i = 0; i < layout.length; ++i) {
      if (_collides(layout[i], layoutItem)) return layout[i]
    }
  }

  function _normalize(layout: GridLayoutConfig) {
    const compareWith: any[] = []
    layout = _sortLayoutItems(layout)
    const _layout = new Array(layout.length)

    layout.forEach((item, index) => {
      let l = JSON.parse(JSON.stringify(item))

      if (!l.static) {
        l = _normalizeItem(compareWith, l, layout)
        compareWith.push(l)
      }

      _layout[index] = l
      l.moved = false
    })
    return _layout
  }

  function _normalizeItem(
    compareWith: any[],
    l: GridLayoutConfig[number],
    layout: GridLayoutConfig,
  ) {
    // 这里与react-grid-layout不同
    // 直接通过判断是否允许碰撞来决定是否需要在水平方向上对齐
    if (props.collision) {
      l.y = Math.min(_calBottom(compareWith), l.y)

      while (l.y > 0 && !_getFirstCollision(compareWith, l)) {
        --l.y
      }
    }

    let collides
    // 存在即使被碰撞网格高度大于1个单位的情况
    // 因此即使下移一格，当前拖曳元素仍然可能处于碰撞状态
    while (
      (collides = _getFirstCollision(compareWith, l)) && props.collision
    ) {
      resolveCompactionCollision(layout, l, collides.y + collides.h, 'y')
    }

    return l
  }
  // 计算整个布局的高度，也就是在y轴上的位置
  function _calBottom(layout: GridLayoutConfig) {
    let max = 0
    layout.forEach(l => {
      const val = l.y + l.h
      if (val > max) max = val
    })
    return max
  }

  function calContainerHeight() {
    if (!props.autoHeight) return
    const rows = _calBottom(layout.value)

    return `${
      rows * props.rowHeight +
      margin.value[1] * (rows - 1) +
      (containerPadding.value?.[1] || margin.value[1]) * 2
    }px`
  }

  const heightWidth = { x: 'w', y: 'h' } as const
  function resolveCompactionCollision(
    layout: GridLayoutConfig,
    item: GridLayoutConfig[number],
    position: number,
    axis: 'x' | 'y',
  ) {
    const sizeProp = heightWidth[axis]
    item[axis] += 1

    const itemIndex = layout.findIndex(each => each === item)

    for (let i = itemIndex + 1; i < layout.length; ++i) {
      const otherItem = layout[i]

      // if (otherItem.i === item.i) continue
      // TODO: optimization
      if (otherItem.y > item.y + item.h) break

      if (_collides(item, otherItem)) {
        resolveCompactionCollision(
          layout,
          otherItem,
          position + item[sizeProp],
          axis,
        )
      }
    }

    item[axis] = position
  }

  return {
    cellWidth,
    cols,
    rowHeight,
    margin,
    maxRows,
    containerPadding,

    calContainerHeight,
    moveTo,
    resizeTo,
    getItem,
    getFull,
  }
}

export function useLayoutItem(props: GridItemProps, layout: ReturnType<typeof useLayout>) {
  const { cellWidth, margin, rowHeight, cols, maxRows, containerPadding: cPadding } = layout
  const dragging = ref<{ x: number, y: number }>()
  const resizing = ref<{ width: number, height: number}>()

  const containerPadding = computed(() => cPadding.value || margin.value)

  const x = computed(() => {
    if (!dragging.value) {
      return Math.round(props.x * (cellWidth.value + margin.value[0]) + containerPadding.value[0])
    } else {
      return Math.round(dragging.value.x)
    }
  })
  const y = computed(() => {
    if (!dragging.value) {
      return Math.round(props.y * (rowHeight.value + margin.value[1]) + containerPadding.value[1])
    } else {
      return Math.round(dragging.value.y)
    }
  })
  const width = computed(() => {
    if (!resizing.value) {
      return Math.round(cellWidth.value * props.width + Math.max(0, props.width - 1) * margin.value[0])
    } else {
      return Math.round(resizing.value.width)
    }
  })
  const height = computed(() => {
    if (!resizing.value) {
      return Math.round(rowHeight.value * props.height + Math.max(0, props.height - 1) * margin.value[1])
    } else {
      return Math.round(resizing.value.height)
    }
  })

  const style = computed(() => {
    return {
      position: 'absolute',
      width: `${width.value}px`,
      height: `${height.value}px`,
      transform: `translate(${x.value}px, ${y.value}px)`,
    }
  })

  const onDragStart: CoreFnCallback = (evt, { node }) => {
    const parentRect = node.offsetParent!.getBoundingClientRect()
    const clientRect = node.getBoundingClientRect()

    dragging.value = {
      x: clientRect.left - parentRect.left + node.offsetParent!.scrollLeft,
      y: clientRect.top - parentRect.top + node.offsetParent!.scrollTop,
    }
  }
  const onDrag: CoreFnCallback = (evt, coreData) => {
    if (!dragging.value) {
      throw new Error('onDrag called before onDragStart')
    }
    const { deltaX, deltaY } = coreData
    const dragX = dragging.value.x + deltaX
    const dragY = dragging.value.y + deltaY

    // TODO: bounded
    // if (true) {
    //   const { offsetParent } = coreData.node
    //   if (offsetParent) {
    //     const bottomBoundary = offsetParent.clientHeight - props.height * gridLayoutContext.rowHeight
    //     dragX = clamp(dragX, 0, bottomBoundary)
    //     const rightBoundary = gridLayoutContext.width - props.width * cellWidth.value
    //     dragY = clamp(dragY, 0, rightBoundary)
    //   }
    // }

    dragging.value = { x: dragX, y: dragY }
    const { x, y } = _calcXY(dragX, dragY)
    props.dragFn(evt, { x, y })
  }
  const onDragStop: CoreFnCallback = (evt) => {
    if (!dragging.value) {
      throw new Error('onDragStop called before onDratStart')
    }
    const { x: _x, y: _y } = dragging.value
    const { x, y } = _calcXY(_x, _y)
    dragging.value = undefined
    props.dragEndFn(evt, { x, y })
  }

  const onResizeStart: ResizeFnCallback = (evt, { width, height }) => {
    resizing.value = { width, height }
  }
  const onResize: ResizeFnCallback = (evt, coreData) => {
    const { width, height } = coreData
    const { w, h } = _calcWH(width, height)
    resizing.value = { width, height }

    props.resizeFn(evt, { w, h })
  }
  const onResizeStop: ResizeFnCallback = (evt, coreData) => {
    resizing.value = undefined
    const { width, height } = coreData
    const { w, h } = _calcWH(width, height)
    props.resizeStopFn(evt, { w, h })
  }

  function _calcXY(left: number, top: number) {
    let x = Math.round((left - margin.value[0]) / (cellWidth.value + margin.value[0]))
    let y = Math.round((top - margin.value[1]) / (rowHeight.value + margin.value[1]))
    x = clamp(x, 0, cols.value - props.width)
    y = clamp(y, 0, maxRows.value - props.height)
    return { x, y }
  }
  function _calcWH(width: number, height: number) {
    let w = Math.round((width + margin.value[0]) / (cellWidth.value + margin.value[0]))
    let h = Math.round((height + margin.value[1]) / (rowHeight.value + margin.value[1]))
    w = clamp(w, 0, cols.value - props.x)
    h = clamp(h, 0, maxRows.value - props.y)

    return { w, h }
  }

  return {
    x,
    y,
    width,
    height,
    dragging,
    resizing,
    style,

    onDragStart,
    onDrag,
    onDragStop,
    onResizeStart,
    onResize,
    onResizeStop,
  }
}
