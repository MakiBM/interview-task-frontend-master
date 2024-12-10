import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from '../../src/components/PageNavbar.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/stops', component: { template: '<div>Stops</div>' } },
  ],
})

describe('PageNavbar Snapshot Tests', () => {
  it('matches the snapshot', () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
