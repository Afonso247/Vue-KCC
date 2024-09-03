import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex'
import auth from './store/auth'
import chat from './store/chat'

const store = createStore({
  // Registro de módulos
  modules: {
    auth,
    chat
  }
})

// Verifica a autenticação ao carregar a aplicação
store.dispatch('auth/checkAuth')

// Guarda de rotas para proteger rotas específicas
router.beforeEach(async (to, from, next) => {
  await store.dispatch('auth/checkAuth')

  // Protege rotas que requerem autenticação
  if (to.meta.requiresAuth && !store.getters['auth/isAuthenticated']) {
    next('/login') // Redireciona para a página de login se o usuário não estiver autenticado
  } else {
    next()
  }
})

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')
