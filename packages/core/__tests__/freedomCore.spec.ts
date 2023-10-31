// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable promise/param-names */
import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import type { CoreFnCallback } from '../src/components/freeDomCore'
import { h } from 'vue'
import { FreeDomCore } from '../src'
import { simulateMoveFromTo } from './util'

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
