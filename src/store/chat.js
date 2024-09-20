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
    // async createChat({ commit }, name) {
    //   try {
    //     const response = await axios.post(
    //       'http://localhost:3000/chat/create-chat',
    //       { name },
    //       { withCredentials: true }
    //     )
    //   } catch (error) {
    //     console.error('Erro ao criar chat:', error)
    //   }
    // },
    // async sendMessage({ commit }, { chatId, content, sender }) {
    //   try {
    //     const response = await axios.post(
    //       `http://localhost:3000/chat/send-message/${chatId}`,
    //       { content, sender },
    //       { withCredentials: true }
    //     )
    //   } catch (error) {
    //     console.error('Erro ao enviar mensagem:', error)
    //   }
    // },
    // async renameChat({ commit }, { chatId, name }) {
    //   try {
    //     const response = await axios.put(
    //       `http://localhost:3000/chat/rename-chat/${chatId}`,
    //       { name },
    //       { withCredentials: true }
    //     )
    //   } catch (error) {
    //     console.error('Erro ao renomear chat:', error)
    //   }
    // },
    // async deleteChat({ commit }, chatId) {
    //   try {
    //     await axios.delete(
    //       `http://localhost:3000/chat/delete-chat/${chatId}`,
    //       { withCredentials: true }
    //     )
    //   } catch (error) {
    //     console.error('Erro ao excluir chat:', error)
    //   }
    // }
  },
  getters: {
    getChats: (state) => state.chats
  }
}
