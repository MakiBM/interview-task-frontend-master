import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from '../../src/components/ListCard.vue'

describe('ListCard Snapshot Tests', () => {
  it('matches the snapshot without a selected item', () => {
    const wrapper = mount(Component, {
      props: {
        items: ['Item 1', 'Item 2', 'Item 3'],
        selected: null, // No item selected
      },
      slots: {
        default: '<h5>Card Header</h5>', // Provide slot content
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches the snapshot with a selected item', () => {
    const wrapper = mount(Component, {
      props: {
        items: ['Item 1', 'Item 2', 'Item 3'],
        selected: 'Item 2', // Pre-selected item
      },
      slots: {
        default: '<h5>Card Header</h5>', // Provide slot content
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
