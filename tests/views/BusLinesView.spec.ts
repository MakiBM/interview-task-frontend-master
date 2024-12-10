import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import Component from '../../src/views/BusLinesView.vue'

describe('BusLines View Snapshot Tests', () => {
  const createMockStore = (stateOverrides = {}, gettersOverrides = {}) => {
    return createStore({
      state: {
        selectedLine: null,
        selectedStation: null,
        orderSorting: 'ASC', // Default sorting
        ...stateOverrides,
      },
      getters: {
        getStopNamesByLine: () => ['Stop 1', 'Stop 2', 'Stop 3'],
        getTimesByLineAndStation: () => ['10:00 AM', '10:30 AM', '11:00 AM'],
        ...gettersOverrides,
      },
      mutations: {
        SET_SELECTED_STATION: vi.fn(),
        TOGGLE_ORDER_SORTING: vi.fn(),
      },
    })
  }

  it('matches the snapshot when no line is selected', () => {
    const store = createMockStore()

    const wrapper = mount(Component, {
      global: {
        plugins: [store],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches the snapshot when a line is selected but no station', () => {
    const store = createMockStore({
      selectedLine: 'Line A', // Line is selected
    })

    const wrapper = mount(Component, {
      global: {
        plugins: [store],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches the snapshot when a line and station are selected', () => {
    const store = createMockStore({
      selectedLine: 'Line A', // Line is selected
      selectedStation: 'Stop 2', // Station is selected
    })

    const wrapper = mount(Component, {
      global: {
        plugins: [store],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
