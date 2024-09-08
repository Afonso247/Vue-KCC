<template>
  <div class="chat-container">
    <button class="menu-button" @click="toggleSidebar" :class="{ hidden: isSidebarOpen }">
      ☰
    </button>
    <Sidebar
      ref="sidebar"
      :chats="chats"
      :activeChatId="activeChatId"
      :showSidebar="isSidebarOpen"
      :errorMsg="errorMsg"
      @create-chat="createNewChat"
      @select-chat="selectChat"
      @rename-chat="renameChat"
      @delete-chat="deleteChat"
      @toggle-sidebar="toggleSidebar"
      @rename-modal="triggerRenameModal"
      @delete-modal="triggerDeleteModal"
    />
    <ChatWindow
      v-if="activeChat"
      ref="chatWindow"
      :messages="activeChat.messages"
      @send-message="sendMessage"
      :class="{ 'full-width': !isSidebarOpen }"
    />
    <div v-else class="no-chat-message" :class="{ 'full-width': !isSidebarOpen }">
      <h2>Nenhum chat atual encontrado.</h2>
      <div>
        Selecione um chat existente ou 
        <a href="#" @click.prevent="createNewChat">crie um novo chat</a>
      </div>
    </div>
  </div>

  <!-- Modal para renomear chat -->
  <Modal :isOpen="renameModalId" @close="closeRenameModal" :title="'Renomear Chat - ' + renameModalName">
    <input type="text" class="modal-input" v-model="newChatName" placeholder="Novo nome do chat" />
    <template #footer>
      <button class="confirm-btn modal-btn" @click="renameChat(renameModalId, newChatName)">Renomear</button>
      <button class="cancel-btn modal-btn" @click="closeRenameModal">Cancelar</button>
    </template>
  </Modal>
  <!-- Modal para excluir chat -->
  <Modal :isOpen="deleteModalId" @close="closeDeleteModal" title="Excluir Chat">
    <div class="modal-message">Tem certeza que deseja excluir {{ deleteModalName }}?</div>
    <template #footer>
      <button class="confirm-btn modal-btn" @click="deleteChat(deleteModalId)">Excluir</button>
      <button class="cancel-btn modal-btn" @click="closeDeleteModal">Cancelar</button>
    </template>
  </Modal>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
import Sidebar from "./ChatSidebar.vue";
import ChatWindow from "./ChatWindow.vue";
import Modal from "../assets/ModalComponent.vue";

export default {
  name: "ChatComponent",
  components: {
    Sidebar,
    ChatWindow,
    Modal
  },
  data() {
    return {
      chats: [],
      activeChatId: null,
      isSidebarOpen: true,
      errorMsg: '',
      errorMsgTimeout: null,
      renameModalId: '',
      renameModalName: '',
      deleteModalId: '',
      deleteModalName: '',
      newChatName: '',
      isMobile: window.innerWidth <= 900,
    };
  },
  watch: {
    errorMsg(newValue) {
      if (newValue) {
        if (this.errorMsgTimeout) {
          clearTimeout(this.errorMsgTimeout)
        }

        this.errorMsgTimeout = setTimeout(() => {
          this.errorMsg = '';
        }, 4000)
      }
    }
  },
  computed: {
    ...mapGetters('chat', ['getChats']),
    activeChat() {
      return this.chats.find((chat) => chat._id === this.activeChatId);
    }
  },
  async created() {
    if (this.isMobile) {
      this.isSidebarOpen = false;
    }

    await this.getAllChats();
    this.chats.push(...this.getChats);

    if (this.chats.length > 0) {
      this.activeChatId = this.chats[0]._id;
    }

    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    ...mapActions('chat', ['getAllChats']),
    async updateChats() {

      await this.getAllChats();
      this.chats = this.getChats;
    },
    async createNewChat() {
      
      try {
        const chatNum = this.chats.length + 1;
        const name = `Chat ${chatNum}`;

        const response = await axios.post(
          'http://localhost:3000/chat/create-chat', 
          { name }, 
          { withCredentials: true }
        )

        await this.updateChats();
        // Seleciona o novo chat criado
        this.selectChat(response.data.chat._id)
        this.errorMsg = '';

      } catch (error) {
        if (error.response.status === 400) {
          this.errorMsg = error.response.data.message;
        } else {
          this.errorMsg = 'Erro ao criar chat';
          console.error(error);
        }
      }
    },
    selectChat(chatId) {
      this.activeChatId = chatId;
    },
    async sendMessage(message) {
      if (!this.activeChat) {
        return;
      }

      try {
        await axios.post(
          `http://localhost:3000/chat/send-message/${this.activeChat._id}`, 
          { content: message, sender: 'user' }, 
          { withCredentials: true }
        )

        await this.updateChats();
        await this.botReply(message, this.activeChat);
      } catch (error) {
        this.errorMsg = 'Erro ao enviar mensagem';
        console.error(error);
      }
    },
    async botReply(message, currentChat) {

      try{
        await axios.post(
          `http://localhost:3000/chat/send-message/${currentChat._id}`, 
          { content: `Mensagem de resposta: ${message}`, sender: 'bot' }, 
          { withCredentials: true }
        )

        await this.updateChats();
        this.$refs.chatWindow.enableInput();

      } catch (error) {
        this.errorMsg = 'Erro ao enviar mensagem';
        console.error(error);
      }
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    checkClose(event) {
      if (!event.target.closest('.chat-sidebar')) {
        this.$refs.sidebar.closeOptions();
      }
    },
    async renameChat(chatId, name) {

      try {
        await axios.put(
          `http://localhost:3000/chat/rename-chat/${chatId}`, 
          { name }, 
          { withCredentials: true }
        )

        await this.updateChats();
        this.closeRenameModal();
        this.errorMsg = '';
      } catch (error) {
        this.errorMsg = 'Erro ao renomear chat';
        console.error(error);
      }
    },
    async deleteChat(chatId) {

      try {
        await axios.delete(
          `http://localhost:3000/chat/delete-chat/${chatId}`, 
          { withCredentials: true }
        )

        await this.updateChats();
        this.closeDeleteModal();
        this.errorMsg = '';
      } catch (error) {
        this.errorMsg = 'Erro ao excluir chat';
        console.error(error);
      }
    },
    triggerRenameModal(chatId) {
      this.renameModalId = chatId;
      const chat = this.chats.find((chat) => chat._id === chatId);

      if (chat) {
        this.renameModalName = chat.name;
      } else {
        this.renameModalName = '';
      }
    },
    closeRenameModal() {
      this.renameModalId = '';
      this.renameModalName = '';
    },
    triggerDeleteModal(chatId) {
      this.deleteModalId = chatId;
      const chat = this.chats.find((chat) => chat._id === chatId);

      if (chat) {
        this.deleteModalName = chat.name;
      } else {
        this.deleteModalName = '';
      }
    },
    closeDeleteModal() {
      this.deleteModalId = '';
      this.deleteModalName = '';
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 900;
      if (this.isMobile) {
        this.isSidebarOpen = false;
      } else {
        this.isSidebarOpen = true;
      }
    },
  },
};
</script>

<style>
.chat-container {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: flex-start;
  height: 100vh;
  border: 3px solid #333333;
  border-radius: 10px;
  padding: 10px;
  position: relative;
}
.no-chat-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: auto;
  transition: width 0.3s ease;
}
.no-chat-message.full-width {
  width: 100%;
}
.no-chat-message h2 {
  color: #485696;
  font-size: 32px;
}
.no-chat-message div {
  color: #485696;
  font-size: 18px;
}
.no-chat-message a {
  color: #5eb1bf;
  text-decoration: none;
  white-space: nowrap;
}
.no-chat-message a:hover {
  color: #f08cae;
  transition: color 0.2s;
}
.menu-button {
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px;
  margin-bottom: 6px;
  border-radius: 5px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1000;
}
.menu-button:hover {
  color: #f08cae;
  transition: color 0.2s;
}
.menu-button.hidden {
  display: none;
}

.modal-input {
  width: 100%;
}
.modal-message {
  display: flex;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: #ff4d4d;
}
.confirm-btn {
  margin: 0 16px;
}

@media (min-width: 901px) {
  .modal-btn {
    width: 120px;
  }
}

@media (max-width: 900px) {
  .chat-container {
    flex-direction: column;
  }

  .menu-button {
    position: static;
    margin-bottom: 6px;
    top: 10px;
    left: 10px;
  }
}
</style>