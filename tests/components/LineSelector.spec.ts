import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import Component from '../../src/components/LineSelector.vue'

describe('LineSelector Component Snapshots', () => {
  it('matches the snapshot with no selected line', () => {
    const store = createStore({
      state: {
        selectedLine: null,
      },
      getters: {
        getLines: () => ['A', 'B', 'C'], // Mock lines
      },
      mutations: {
        SET_SELECTED_LINE: vi.fn(), // Mock mutation
      },
    })

    const wrapper = mount(Component, {
      global: {
        plugins: [store],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches the snapshot with a selected line', () => {
    const store = createStore({
      state: {
        selectedLine: 'A', // Mock a selected line
      },
      getters: {
        getLines: () => ['A', 'B', 'C'], // Mock lines
      },
      mutations: {
        SET_SELECTED_LINE: vi.fn(), // Mock mutation
      },
    })

    const wrapper = mount(Component, {
      global: {
        plugins: [store],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
