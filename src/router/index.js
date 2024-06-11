import { createRouter, createWebHistory } from 'vue-router'

const defaultRoute = '/home'

const routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'Login',
    component: function () {
      return import('../views/LoginView.vue')
    }
  },
  {
    path: `${defaultRoute}`,
    name: 'Home',
    component: function () {
      return import('../views/SubstationsView.vue')
    }
  },
  {
    path: '/substation/new',
    name: 'New Substation',
    component: function () {
      return import('../views/SubstationDetailView.vue')
    }
  },
  {
    path: '/substation/:id/details',
    name: 'Substation Detail',
    component: function () {
      return import('../views/SubstationDetailView.vue')
    }
  },
  {
    path: '/substation/:id/edit',
    name: 'Substation Edit',
    component: function () {
      return import('../views/SubstationDetailView.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
