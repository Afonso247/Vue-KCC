import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LogInView from '../views/LogInView.vue'
import PersonagensView from '../views/PersonagensView.vue'
import EditGroupView from '../views/EditGroupView.vue'

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
      path: '/personagens',
      name: 'personagens',
      component: PersonagensView
    },
    {
      path: '/grupos/:id',
      name: 'EditGroup',
      component: EditGroupView
    }
  ]
})

export default router
