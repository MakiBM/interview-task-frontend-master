import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import Component from '../src/App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/stops', component: { template: '<div>Stops</div>' } },
  ],
})

describe('App Snapshot Tests with Conditional Rendering', () => {
  const createMockStore = (stateOverrides = {}) => {
    return createStore({
      state: {
        isLoading: false,
        isError: false,
        ...stateOverrides,
      },
      actions: {
        FETCH_STOPS: vi.fn(),
      },
    })
  }

  it('matches the snapshot when isLoading is true', async () => {
    const store = createMockStore({ isLoading: true })

    const wrapper = mount(Component, {
      global: {
        plugins: [store, router],
      },
    })

    // Simulate that onMounted has been triggered
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches the snapshot when isError is true', async () => {
    const store = createMockStore({ isError: true })

    const wrapper = mount(Component, {
      global: {
        plugins: [store, router],
      },
    })

    // Simulate that onMounted has been triggered
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches the snapshot when neither isLoading nor isError is true', async () => {
    const store = createMockStore({ isLoading: false, isError: false })

    const wrapper = mount(Component, {
      global: {
        plugins: [store, router],
      },
    })

    // Simulate that onMounted has been triggered
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
