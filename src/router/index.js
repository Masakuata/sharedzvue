import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/identificate',
    name: 'identificate',
    component: function () {
      return import(/* webpackChunkName: "identificate" */ '../views/identificate/MainIdentificate.vue')
    }
  },

  {
    path: '/about',
    name: 'about',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  },
  {
    path: '/login',
    name: 'login',
    component: function () {
      return import(/* webpackChunkName: "login" */ '../views/login/MainLogin.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
