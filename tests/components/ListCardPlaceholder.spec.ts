import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from '../../src/components/ListCardPlaceholder.vue'

describe('ListCardPlaceholder Snapshot Tests', () => {
  it('matches the snapshot', () => {
    const wrapper = mount(Component, {
      props: {
        title: 'Placeholder Title',
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
