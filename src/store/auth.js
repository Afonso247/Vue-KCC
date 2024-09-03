import axios from 'axios'

export default {
  namespaced: true,
  state: {
    isAuth: false,
    user: null
  },
  mutations: {
    SET_AUTH(state, status) {
      state.isAuth = status
    },
    SET_USER(state, userData) {
      state.user = userData
    },
    LOGOUT(state) {
      state.isAuth = false
      state.user = null
    }
  },
  actions: {
    async checkAuth({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/check', {
          withCredentials: true
        })
        if (response.status === 200 && response.data.authenticated) {
          commit('SET_AUTH', true)
          commit('SET_USER', response.data.user) // Supondo que os dados do usuário estejam disponíveis na resposta
        } else {
          commit('SET_AUTH', false)
          commit('SET_USER', null)
        }
      } catch (error) {
        commit('SET_AUTH', false)
        commit('SET_USER', null)
      }
    },
    async logout({ commit }) {
      try {
        const response = await axios.post(
          'http://localhost:3000/api/auth/logout',
          {},
          { withCredentials: true }
        )
        if (response.status === 200) {
          console.log('Logout realizado com sucesso:', response.data)
        } else {
          console.error('Logout falhou:', response.data)
        }
      } catch (error) {
        console.error('Logout falhou:', error)
      } finally {
        commit('LOGOUT')
      }
    }
  },
  getters: {
    isAuthenticated: (state) => state.isAuth,
    user: (state) => state.user
  }
}
