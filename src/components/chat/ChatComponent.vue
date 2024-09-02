<template>
  <div class="chat-container">
    <Sidebar
      :chats="chats"
      :activeChatId="activeChatId"
      @create-chat="createNewChat"
      @select-chat="selectChat"
    />
    <ChatWindow
      v-if="activeChat"
      :messages="activeChat.messages"
      @send-message="sendMessage"
    />
  </div>
</template>

<script>
import Sidebar from "./ChatSidebar.vue";
import ChatWindow from "./ChatWindow.vue";

export default {
  components: {
    Sidebar,
    ChatWindow,
  },
  data() {
    return {
      chats: [
        { id: 1, name: "Chat 1", messages: [] },
        { id: 2, name: "Chat 2", messages: [] },
      ],
      activeChatId: null,
    };
  },
  computed: {
    activeChat() {
      return this.chats.find((chat) => chat.id === this.activeChatId);
    },
  },
  created() {
    if (this.chats.length > 0) {
      this.activeChatId = this.chats[0].id;
    }
  },
  methods: {
    createNewChat() {
      const newChatId = this.chats.length + 1;
      this.chats.push({ id: newChatId, name: `Chat ${newChatId}`, messages: [] });
      this.activeChatId = newChatId;
    },
    selectChat(chatId) {
      this.activeChatId = chatId;
    },
    sendMessage(message) {
      if (!this.activeChat) {
        return;
      }

      this.activeChat.messages.push({ text: message, sender: "user" });
      this.botReply(message, this.activeChat);
    },
    botReply(message, currentChat) {
        setTimeout(() => {
            if (currentChat) {
                currentChat.messages.push({ 
                    text: `lorem ipsum dolor sit amet: ${message}`, 
                    sender: "bot" 
                });
            }
        }, 1000);
    }
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
}
</style>