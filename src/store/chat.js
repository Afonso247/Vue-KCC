import axios from 'axios'

export default {
  namespaced: true,
  state: {
    chats: null
  },
  mutations: {
    SET_CHATS(state, chats) {
      state.chats = chats
    }
  },
  actions: {
    async getAllChats({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/chat/get-chats', {
          withCredentials: true
        })
        commit('SET_CHATS', response.data.chats)
      } catch (error) {
        console.error('Erro ao buscar chats:', error)
      }
    }
  },
  getters: {
    getChats: (state) => state.chats
  }
}
