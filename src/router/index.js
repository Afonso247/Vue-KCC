import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
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
