<template>
  <div class="chat-window">
    <div class="messages">
      <div v-for="(message, index) in messages" :key="index" :class="['message', message.role]">
        <img
          :src="
            message.role === 'user'
              ? '/img/chatimg/user-placeholder.png'
              : '/img/chatimg/user-kokomi.png'
          "
          :alt="message.role === 'user' ? 'User Avatar' : 'Kokomai Avatar'"
          class="avatar"
        />
        <div class="message-content" v-html="formatMessage(message.content)"></div>
      </div>
      <div class="no-messages" v-if="messages.length === 0">Por favor aguarde...</div>
      <div v-if="isLoading" class="loading-indicator">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
    <div class="input-container">
      <input
        type="text"
        v-model="newMessage"
        @keyup.enter="sendMessage"
        :disabled="isSending"
        placeholder="Digite sua mensagem..."
      />
      <button class="confirm-btn" @click="sendMessage" :disabled="isSending">Enviar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatWindow',
  props: {
    messages: Array
  },
  data() {
    return {
      newMessage: '',
      isSending: false,
      isLoading: false,
      revealedText: '',
      isRevealed: false
    }
  },
  methods: {
    formatMessage(text) {
      return text.replace(
        /\*\*(.*?)\*\*/g, '<span style="background-color: #d9cff5; font-weight: bold; color: #5a6472;">$1</span>'
      );
    },
    sendMessage() {
      if (!this.newMessage || this.isSending) {
        return
      }
      this.isSending = true
      this.$emit('send-message', this.newMessage)
      this.newMessage = ''
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const messages = this.$el.querySelector('.messages')
        messages.scrollTop = messages.scrollHeight
      })
    },
    enableInput() {
      this.isSending = false
    },
    startLoading() {
      this.isLoading = true
      this.scrollToBottom()
    },
    stopLoading() {
      this.isLoading = false
    }
  }
}
</script>

<style scoped>
.chat-window {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #b8e1ff;
  border-radius: 5px;
}
.messages {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 10px;
  background-color: #ffffff;
  position: relative;
}
.no-messages {
  background-color: transparent;
  color: #f08cae;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 600px) {
    font-size: 20px;
  }
}
.message {
  display: flex;
  align-items: flex-start;
  color: #333333;
  padding: 5px 10px;
  margin-bottom: 20px;
  border-radius: 5px;
}
.message .avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 10px;
  background-color: rgba(255, 255, 255, 0.5);
}
.message .message-content {
  flex: 1;
  margin-top: 0.2rem;
  background-color: transparent;
}
.message.user {
  background-color: #b8e1ff;
  align-self: flex-end;
  text-align: right;
  width: 90%;
  flex-direction: row-reverse;
}
.message.user .avatar {
  margin-right: 0;
  margin-left: 10px;
}
.message.assistant {
  background-color: #d9cff5;
  align-self: flex-start;
  width: 90%;
}
.input-container {
  display: flex;
  width: 90%;
  padding: 0 10px;
  background-color: transparent;
}
.input-container input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  text-overflow: ellipsis;
  background-color: #fff;
  color: #5a6472;
  overflow: hidden;
}
.input-container button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
}
.input-container button:disabled {
  cursor: not-allowed;
  pointer-events: none;
}
.confirm-btn {
  margin: 0 auto;
}

.loading-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  background-color: transparent;
}
.loading-message {
  color: #f08cae;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  background-color: transparent;
}
.dot {
  width: 8px;
  height: 8px;
  background-color: #fff;
  border-radius: 50%;
  margin: 0 3px;
  animation: bounce 1.4s infinite ease-in-out both;
}
.dot:nth-child(1) {
  animation-delay: -0.32s;
}
.dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>
