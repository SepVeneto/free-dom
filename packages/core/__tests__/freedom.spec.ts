// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable promise/param-names */
import { describe, expect, test, vi } from 'vitest'
import { FreeDom, FreeDomCore, FreeScene } from '../src'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { h, nextTick, ref } from 'vue'
import type { CoreFnCallback } from '../src/components/freeDomCore'

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
        width: 100,
        height: 100,
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
      <FreeScene :width="100" :height="100">
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
    wrapper.setData({
      nodeList,
    })
    await nextTick()
    expect(nodeList[0].style.x).toBe(0)
    expect(nodeList[0].style.y).toBe(80)
  })
})

describe('reactive diff', () => {
  test('dynamic diff', async () => {
    const nodeList = [
      { style: { x: 0, y: 0 } },
      { style: { x: 25, y: 0 } },
    ]
    const wrapper = mount({
      components: {
        FreeDom,
        FreeScene,
      },
      template: `
        <FreeScene
          :width="100"
          :height="100"
          :diff="diff"
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
        diff: 0,
      }),
    })

    const dnd = wrapper.findComponent({ name: 'FreeDomCore' })
    dnd.trigger('mousedown')

    wrapper.setData({ diff: 2 })
    await nextTick()

    {
      const mousemove = new MouseEvent('mousemove', { clientY: 0, clientX: 4 })
      const ownerDoc = wrapper.element.ownerDocument
      ownerDoc.dispatchEvent(mousemove)
    }

    dnd.trigger('mouseup')

    expect(nodeList[0].style.x).toBe(5)
  })
})

describe('core drag scale', () => {
  test('when parent element is 0.5x', () => new Promise<void>(done => {
    const onDragFn: CoreFnCallback = (evt, data) => {
      expect(data.x).equal(200)
      expect(data.y).equal(200)
      expect(data.deltaX).equal(200)
      expect(data.deltaY).equal(200)
      done()
    }
    const wrapper = mount(h(
      FreeDomCore,
      {
        scale: 0.5,
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
      FreeDomCore,
      {
        scale: 2,
        dragFn: onDragFn,
      },
      () => h('test'),
    ))

    simulateMoveFromTo(wrapper, 0, 0, 100, 100)
  }))
})

function simulateMoveFromTo(
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
