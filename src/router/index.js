import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DriverAppView from '../views/DriverAppView.vue'
import NextTravel from '@/views/NextTravel.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/app',
    name: 'app',
    component: DriverAppView
  },
  {
    path: '/next-travel',
    name: 'next-travel',
    component: NextTravel
  }
]

const router = new VueRouter({
  routes
})

export default router
