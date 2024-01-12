// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable promise/param-names */
import { describe, expect, test, vi } from 'vitest'
import { FreeDom, FreeScene } from '../src'
import { mount } from '@vue/test-utils'
import { h, nextTick, ref } from 'vue'
import { simulateMoveFromTo } from './util'
import type { CoreFnCallback } from '../src/components/freeDomCore'
import ResizeObserver from 'resize-observer-polyfill'

global.ResizeObserver = ResizeObserver
global.window.HTMLElement.prototype.getBoundingClientRect = function () {
  const width = parseFloat(this.style.width) || 0
  const height = parseFloat(this.style.height) || 0
  const x = parseFloat(this.style.marginLeft) || 0
  const y = parseFloat(this.style.marginTop) || 0
  const rect = {
    x,
    y,
    bottom: y + height,
    height,
    left: x,
    right: x + width,
    top: y,
    width,
  }
  return {
    ...rect,
    toJSON: function () { return JSON.stringify(rect) },
  }
}

describe('callback', () => {
  test('drag fn', async () => {
    const options = {
      dragStartFn: () => ({}),
      dragStopFn: () => ({}),
      dragFn: () => ({}),
    }
    const dragStartSpy = vi.spyOn(options, 'dragStartFn')
    const dragStopSpy = vi.spyOn(options, 'dragStopFn')
    const dragSpy = vi.spyOn(options, 'dragFn')

    const wrapper = mount(h(FreeDom, options, () => h('span', 'test')))
    expect(wrapper.classes()).toContain('vv-free-dom--draggable')

    simulateMoveFromTo(wrapper, 0, 0, 100, 100)

    expect(dragStartSpy).toHaveBeenCalled()
    expect(dragSpy).toHaveBeenCalled()
    expect(dragStopSpy).toHaveBeenCalled()
  })
  test('resize fn', async () => {
    const options = {
      resizeFn: () => ({}),
      resizeStartFn: () => ({}),
      resizeStopFn: () => ({}),
    }
    const resizeStartSpy = vi.spyOn(options, 'resizeStartFn')
    const resizeSpy = vi.spyOn(options, 'resizeFn')
    const resizeStopSpy = vi.spyOn(options, 'resizeStopFn')

    const wrapper = mount(h(FreeDom, options, () => h('span', 'test')))
    const resize = wrapper.findComponent({ name: 'ResizeDomCore' })
    expect(resize.classes()).toContain('vv-resize-dom--box')

    simulateMoveFromTo(resize, 0, 0, 100, 100)

    expect(resizeStartSpy).toHaveBeenCalled()
    expect(resizeSpy).toHaveBeenCalled()
    expect(resizeStopSpy).toHaveBeenCalled()
  })
})

describe('drag handle', () => {
  test('cannot find handle', async () => {
    const warnSpy = vi.spyOn(console, 'warn')

    const wrapper = mount(h(
      FreeDom,
      { handle: 'operate' },
      () => [h('div', { class: 'operate' }, 'x')],
    ))
    const dnd = wrapper.findComponent({ name: 'FreeDomCore' })
    dnd.trigger('mousedown')
    expect(warnSpy).toHaveBeenCalledOnce()
  })
  test('drag handle with class', async () => {
    const options = {
      dragStartFn: () => ({}),
      handle: '.operate',
    }
    const dragStartSpy = vi.spyOn(options, 'dragStartFn')

    const wrapper = mount(h(
      FreeDom,
      options,
      () => [h('div', { class: 'operate' }, 'x')],
    ))
    const dnd = wrapper.findComponent({ name: 'FreeDomCore' })
    dnd.trigger('mousedown')
    expect(dragStartSpy).not.toHaveBeenCalled()
    dnd.find('.operate').trigger('mousedown')
    expect(dragStartSpy).toHaveBeenCalled()
  })
  test('drag handle with id', async () => {
    const options = {
      dragStartFn: () => ({}),
      handle: '#operate',
    }
    const dragStartSpy = vi.spyOn(options, 'dragStartFn')

    const wrapper = mount(h(
      FreeDom,
      options,
      () => [h('div', { id: 'operate' }, 'x')],
    ))
    const dnd = wrapper.findComponent({ name: 'FreeDomCore' })
    dnd.trigger('mousedown')
    expect(dragStartSpy).not.toHaveBeenCalled()
    dnd.find('#operate').trigger('mousedown')
    expect(dragStartSpy).toHaveBeenCalled()
  })
})

describe('auto correct', () => {
  test('when scene mounted', async () => {
    const INIT = { x: -20, y: 100, w: 20, h: 20 }
    const pos = ref(INIT)
    mount(h(
      FreeScene,
      {
        style: 'width: 100px; height: 100px;',
      },
      () => h(FreeDom, {
        modelValue: pos.value,
        'onUpdate:modelValue': (val) => { pos.value = val },
      }, () => h('span', 'test')),
    ))
    await nextTick()
    expect(pos.value.x).toBe(0)
    expect(pos.value.y).toBe(80)
  })
  test('when add new', async () => {
    const nodeList = [{ style: { x: -20, y: 100 } }]
    const wrapper = mount({
      components: {
        FreeDom,
        FreeScene,
      },
      template: `
      <FreeScene style="width: 100px; height: 100px;">
        <FreeDom
          v-for="(node, index) in nodeList"
          :key="index"
          :width="20"
          :height="20"
          v-model="node.style"
        >{{ index }}</FreeDom>
      </FreeScene>
      `,
      data: () => ({ nodeList: [] }),
    })
    await nextTick()
    await wrapper.setData({
      nodeList,
    })
    expect(nodeList[0].style.x).toBe(0)
    expect(nodeList[0].style.y).toBe(80)
  })
})

function renderDemo(nodeList: any[], data: Record<string, any> = {}) {
  return mount({
    components: {
      FreeDom,
      FreeScene,
    },
    template: `
        <FreeScene
          style="width: 100px; height: 100px;"
          :diff="diff"
          v-bind="data"
        >
          <FreeDom
            v-for="(node, index) in nodeList"
            :key="index"
            :width="20"
            :height="20"
            v-model="node.style"
          >{{ index }}</FreeDom>
        </FreeScene>
      `,
    data: () => ({
      nodeList,
      diff: 3,
      data,
    }),
  })
}
describe('diff', () => {
  test('dynamic diff', async () => {
    const nodeList = [
      { style: { x: 0, y: 0 } },
      { style: { x: 25, y: 0 } },
    ]
    const node = nodeList[0]
    const wrapper = renderDemo(nodeList)
    await nextTick()

    simulateMoveFromTo(wrapper, node.style.x, node.style.y, 3, 0)
    expect(nodeList[0].style.x).toBe(5)

    wrapper.setData({ diff: 1 })
    await nextTick()

    simulateMoveFromTo(wrapper, node.style.x, node.style.y, 3, 0)
    expect(nodeList[0].style.x).toBe(3)
  })
  test('use shift to ignore diff', async () => {
    const nodeList = [
      { style: { x: 0, y: 0 } },
      { style: { x: 25, y: 0 } },
    ]
    const wrapper = renderDemo(nodeList)
    await nextTick()

    simulateMoveFromTo(wrapper, 0, 0, 4, 0, true)
    expect(nodeList[0].style.x).toBe(4)
  })
})

describe('drag scale', () => {
  test('when parent element is 0.5x', () => new Promise<void>(done => {
    const onDragFn: CoreFnCallback = (evt, data) => {
      expect(data.x).equal(200)
      expect(data.y).equal(200)
      expect(data.deltaX).equal(200)
      expect(data.deltaY).equal(200)
      done()
    }
    const wrapper = mount(h(
      FreeDom,
      {
        transformScale: 0.5,
        dragFn: onDragFn,
      },
      () => h('test'),
    ))

    simulateMoveFromTo(wrapper, 0, 0, 100, 100)
  }))
  test('when parent element is 2x', () => new Promise<void>(done => {
    const onDragFn: CoreFnCallback = (evt, data) => {
      expect(data.x).equal(50)
      expect(data.y).equal(50)
      expect(data.deltaX).equal(50)
      expect(data.deltaY).equal(50)
      done()
    }
    const wrapper = mount(h(
      FreeDom,
      {
        transformScale: 2,
        dragFn: onDragFn,
      },
      () => h('test'),
    ))

    simulateMoveFromTo(wrapper, 0, 0, 100, 100)
  }))
})

describe('select', () => {
  test('single selection', async () => {
    const wrapper = mount(h(FreeDom, () => h('span', 'test')))
    const dnd = wrapper.findComponent({ name: 'FreeDom' })
    dnd.trigger('click')
    await nextTick()
    expect(dnd.element.classList).toContain('vv-free-dom--draggable__selected')
  })

  test('multiple selection with ctrl', async () => {
    const nodeList = [
      { style: { x: 0, y: 0 } },
      { style: { x: 25, y: 0 } },
    ]
    const wrapper = renderDemo(nodeList)

    const [first, second] = wrapper.findAllComponents({ name: 'FreeDom' })

    first.trigger('click')
    await nextTick()
    expect(first.element.classList).toContain('vv-free-dom--draggable__selected')
    expect(second.element.classList).not.toContain('vv-free-dom--draggable__selected')
    second.trigger('click')
    await nextTick()
    expect(first.element.classList).not.toContain('vv-free-dom--draggable__selected')
    expect(second.element.classList).toContain('vv-free-dom--draggable__selected')

    first.trigger('click', { ctrlKey: true })
    await nextTick()
    expect(first.element.classList).toContain('vv-free-dom--draggable__selected')
    expect(second.element.classList).toContain('vv-free-dom--draggable__selected')
  })

  test('multiple selection with area', async () => {
    const nodeList = [
      { style: { x: 0, y: 0 } },
      { style: { x: 25, y: 0 } },
    ]
    const wrapper = renderDemo(nodeList)

    const scene = wrapper.findComponent({ name: 'FreeDomWrap' })
    scene.trigger('mousedown')
    scene.trigger('mousemove', { clientX: 100, clientY: 100 })
    await nextTick()
    const [first, second] = wrapper.findAllComponents({ name: 'FreeDom' })
    expect(first.element.classList).toContain('vv-free-dom--draggable__selected')
    expect(second.element.classList).toContain('vv-free-dom--draggable__selected')
  })

  test('forbidden select', async () => {
    const wrapper = mount(h(FreeDom, { disabledSelect: true }, () => h('span', 'test')))
    const dnd = wrapper.findComponent({ name: 'FreeDom' })
    dnd.trigger('click')
    await nextTick()
    expect(dnd.element.classList).not.toContain('vv-free-dom--draggable__selected')
  })

  test('forbidden batch select', async () => {
    const nodeList = [
      { style: { x: 0, y: 0 } },
      { style: { x: 25, y: 0 } },
    ]
    const wrapper = renderDemo(nodeList, { disabledSelect: true })
    await wrapper.setData({ disabledBatch: true })
    const scene = wrapper.findComponent({ name: 'FreeDomWrap' })

    scene.trigger('mousedown')
    scene.trigger('mousemove', { clientX: 100, clientY: 100 })
    await nextTick()

    const [first, second] = wrapper.findAllComponents({ name: 'FreeDom' })
    expect(first.element.classList).not.toContain('vv-free-dom--draggable__selected')
    expect(second.element.classList).not.toContain('vv-free-dom--draggable__selected')
  })
})

describe('multiple area trigger condition', () => {
  test('away from', async () => {
    const nodeList = [
      { style: { x: 0, y: 0 } },
      { style: { x: 25, y: 0 } },
    ]
    const wrapper = renderDemo(nodeList)

    const scene = wrapper.findComponent({ name: 'FreeDomWrap' })
    scene.trigger('mousedown')
    scene.trigger('mousemove', { clientX: 24, clientY: 100 })
    await nextTick()
    const [first, second] = wrapper.findAllComponents({ name: 'FreeDom' })
    expect(first.element.classList).toContain('vv-free-dom--draggable__selected')
    expect(second.element.classList).not.toContain('vv-free-dom--draggable__selected')
  })
  test('intersect but not meet the condition', async () => {
    const nodeList = [
      { style: { x: 0, y: 0 } },
      { style: { x: 25, y: 0 } },
    ]
    const wrapper = renderDemo(nodeList)

    const scene = wrapper.findComponent({ name: 'FreeDomWrap' })
    scene.trigger('mousedown')
    scene.trigger('mousemove', { clientX: 24, clientY: 100 })
    await nextTick()

    const [first, second] = wrapper.findAllComponents({ name: 'FreeDom' })
    expect(first.element.classList).toContain('vv-free-dom--draggable__selected')
    expect(second.element.classList).not.toContain('vv-free-dom--draggable__selected')
  })

  /**
   * target node width / 5, height / 5
   */
  test('intersect and meet the condition', async () => {
    const nodeList = [
      { style: { x: 0, y: 0 } },
      { style: { x: 25, y: 0 } },
    ]
    const wrapper = renderDemo(nodeList)

    const scene = wrapper.findComponent({ name: 'FreeDomWrap' })
    scene.trigger('mousedown')
    scene.trigger('mousemove', { clientX: 36, clientY: 5 })
    await nextTick()

    const [first, second] = wrapper.findAllComponents({ name: 'FreeDom' })
    expect(first.element.classList).toContain('vv-free-dom--draggable__selected')
    expect(second.element.classList).toContain('vv-free-dom--draggable__selected')
  })
})

describe('minisize', () => {
  test('without lock aspect ratio', async () => {
    const node = ref({
      w: 20,
      h: 30,
      x: 0,
      y: 0,
    })
    const options = {
      scale: ['rb'] as ['rb'],
      modelValue: node.value,
      minWidth: 50,
      minHeight: 50,
      'onUpdate:modelValue': (val: any) => { node.value = val },
    }
    const wrapper = mount(h(FreeDom, options, () => h('span', 'test')))
    const resize = wrapper.findComponent({ name: 'ResizeDomCore' })

    simulateMoveFromTo(resize, 20, 20, 30, 40)
    expect(node.value.w).toBe(50)
    expect(node.value.h).toBe(50)
  })
  test('lock aspect ratio', async () => {
    const node = ref({
      w: 40,
      h: 20,
      x: 0,
      y: 0,
    })
    const options = {
      scale: ['rb'] as ['rb'],
      lockAspectRatio: true,
      modelValue: node.value,
      minWidth: 50,
      minHeight: 50,
      'onUpdate:modelValue': (val: any) => { node.value = val },
    }
    const wrapper = mount(h(FreeDom, options, () => h('span', 'test')))
    const resize = wrapper.findComponent({ name: 'ResizeDomCore' })

    simulateMoveFromTo(resize, 40, 20, 100, 30)
    expect(node.value.w).toBe(100)
    expect(node.value.h).toBe(50)
  })
})
