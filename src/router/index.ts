import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import BusLines from '../views/BusLinesView.vue'
import StopsView from '../views/StopsView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: BusLines
  },
  {
    path: '/stops',
    name: 'stops',
    component: StopsView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
