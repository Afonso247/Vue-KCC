import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LogInView from '../views/LogInView.vue'
import UserConfigView from '../views/UserConfigView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LogInView
    },
    {
      path: '/userconfig',
      name: 'userconfig',
      component: UserConfigView
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFoundView
    }
  ]
})

export default router
