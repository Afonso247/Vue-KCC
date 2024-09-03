<template>
  <div class="chat-container">
    <button class="menu-button" @click="toggleSidebar" :class="{ hidden: isSidebarOpen }" v-if="isMobile">
      ☰
    </button>
    <Sidebar
      :chats="chats"
      :activeChatId="activeChatId"
      :showSidebar="isSidebarOpen"
      @create-chat="createNewChat"
      @select-chat="selectChat"
      @rename-chat="renameChat"
      @delete-chat="deleteChat"
      @toggle-sidebar="toggleSidebar"
    />
    <ChatWindow
      v-if="activeChat"
      ref="chatWindow"
      :messages="activeChat.messages"
      @send-message="sendMessage"
    />
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
import Sidebar from "./ChatSidebar.vue";
import ChatWindow from "./ChatWindow.vue";

export default {
  name: "ChatComponent",
  components: {
    Sidebar,
    ChatWindow,
  },
  data() {
    return {
      chats: [],
      activeChatId: null,
      isSidebarOpen: true,
      isMobile: window.innerWidth <= 768,
    };
  },
  computed: {
    ...mapGetters('chat', ['getChats']),
    // ...mapGetters({
    //   gatherChats: 'chat/gatherChats',
    //   getValue: 'chat/getValue',
    // }),
    activeChat() {
      return this.chats.find((chat) => chat._id === this.activeChatId);
    },
  },
  async created() {
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
        const newChatId = this.chats.length + 1;
        const name = `Chat ${newChatId}`;
        await axios.post(
          'http://localhost:3000/chat/create-chat', 
          { name }, 
          { withCredentials: true }
        )
        this.updateChats();
      } catch (error) {
        console.error('Erro ao criar chat:', error);
      }
      // this.chats.push({ id: newChatId, name: `Chat ${newChatId}`, messages: [] });
      // this.activeChatId = newChatId;
    },
    selectChat(chatId) {
      this.activeChatId = chatId;
    },
    async sendMessage(message) {
      console.log('message', message)
      if (!this.activeChat) {
        return;
      }

      try {
        await axios.post(
          `http://localhost:3000/chat/send-message/${this.activeChat._id}`, 
          { content: message, sender: 'user' }, 
          { withCredentials: true }
        )
        this.updateChats();
        this.botReply(message, this.activeChat);
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }
    },
    async botReply(message, currentChat) {
      try{
        await axios.post(
          `http://localhost:3000/chat/send-message/${currentChat._id}`, 
          { content: `Mensagem de resposta: ${message}`, sender: 'bot' }, 
          { withCredentials: true }
        )
        this.updateChats();
        this.$refs.chatWindow.enableInput();
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    async renameChat(chatId, name) {
      console.log(chatId)
      try {
        await axios.put(
          `http://localhost:3000/chat/rename-chat/${chatId}`, 
          { name }, 
          { withCredentials: true }
        )
        this.updateChats();
      } catch (error) {
        console.error('Erro ao renomear chat:', error);
      }
    },
    async deleteChat(chatId) {
      try {
        await axios.delete(
          `http://localhost:3000/chat/delete-chat/${chatId}`, 
          { withCredentials: true }
        )
        this.updateChats();
      } catch (error) {
        console.error('Erro ao excluir chat:', error);
      }
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 768;
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
  height: 100vh;
  border: 3px solid #333333;
  border-radius: 10px;
  padding: 10px;
  position: relative;
}
.menu-button {
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  display: none;
  width: 40px;
  height: 40px;
}

@media (max-width: 768px) {
  .chat-container {
    flex-direction: column;
  }

  .menu-button {
    display: block;
  }
  .hidden {
    display: none;
}
}
</style>