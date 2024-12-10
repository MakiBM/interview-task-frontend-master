import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import Component from '../../src/views/StopsView.vue'

describe('Stops View Snapshot Tests', () => {
  const createMockStore = () => {
    return createStore({
      getters: {
        getStopNamesBySearchQuery: () => ['Stop 1', 'Stop 2', 'Stop 3', 'Line A'], // Mock list of stops
      }
    })
  }

  it('matches the snapshot with an empty search query', async () => {
    const store = createMockStore()
    const wrapper = mount(Component, {
      global: {
        plugins: [store],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
