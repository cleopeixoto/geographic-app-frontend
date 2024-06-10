import { createRouter, createWebHistory } from 'vue-router'

const defaultRoute = '/home'

const routes = [
  {
    path: '/',
    redirect: 'home'
  },
  {
    path: `${defaultRoute}`,
    name: 'Home',
    component: function () {
      return import('../views/SubstationsView.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
