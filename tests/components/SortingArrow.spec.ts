import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from '../../src/components/SortingArrow.vue'

describe('SortingArrow Snapshot Tests', () => {
  it('matches the snapshot, sorting ASC', () => {
    const wrapper = mount(Component, {
      props: {
        isDown: true,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches the snapshot, sorting DESC', () => {
    const wrapper = mount(Component, {
      props: {
        isDown: false,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
