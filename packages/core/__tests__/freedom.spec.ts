import { describe, expect, test, vi } from 'vitest'
import { FreeDom } from '../src'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

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

    const dnd = wrapper.findComponent({ name: 'FreeDomCore' })

    dnd.trigger('mousedown')
    expect(dragStartSpy).toHaveBeenCalled()

    const mousemove = new MouseEvent('mousemove')
    const ownerDoc = wrapper.element.ownerDocument
    ownerDoc.dispatchEvent(mousemove)
    expect(dragSpy).toHaveBeenCalled()

    dnd.trigger('mouseup')
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

    const dnd = resize.findComponent({ name: 'FreeDomCore' })
    dnd.trigger('mousedown')
    expect(resizeStartSpy).toHaveBeenCalled()

    const mousemove = new MouseEvent('mousemove')
    const ownerDoc = wrapper.element.ownerDocument
    ownerDoc.dispatchEvent(mousemove)
    expect(resizeSpy).toHaveBeenCalled()

    dnd.trigger('mouseup')
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
