import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from '../../src/components/FormInput.vue'

describe('FormInput Snapshot Tests', () => {
  it('matches the snapshot', () => {
    const wrapper = mount(Component, {
      props: {
        label: 'Test Label',
        name: 'Test Placeholder',
        modelValue: 'Test Value',
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
