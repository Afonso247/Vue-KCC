<template>
  <div class="chat-window">
    <div class="messages">
      <div v-for="(message, index) in messages" :key="index" :class="['message', message.role]">
        <img
          :src="
            message.role === 'user'
              ? '/img/chatimg/user-placeholder.png'
              : '/img/chatimg/user-ana.png'
          "
          :alt="message.role === 'user' ? 'User Avatar' : 'Ana Avatar'"
          class="avatar"
        />
        <div class="message-content" v-html="formatMessage(message.content)"></div>
      </div>
      <div class="no-messages" v-if="messages.length === 0">Por favor aguarde...</div>
      
      <!-- Indicador de digitação com fade -->
      <div v-if="isLoading" class="typing-indicator">
        <img
          src="/img/chatimg/user-ana.png"
          alt="Ana Avatar"
          class="avatar"
        />
        <div class="typing-message">Ana está digitando...</div>
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
    messages: Array,
    isLoading: Boolean
  },
  data() {
    return {
      newMessage: '',
      isSending: false,
      revealedText: '',
      isRevealed: false
    }
  },
  methods: {
    formatMessage(text) {
      // Substitui quebras de linha por <br>
      let formatted = text.replace(/\n/g, '<br>');
      
      // Formata texto entre ** ** (negrito com fundo)
      formatted = formatted.replace(
        /\*\*(.*?)\*\*/g, 
        '<span style="background-color: #d9cff5; font-weight: bold; color: #5a6472;">$1</span>'
      );
      
      // Formata texto entre " " (destaque)
      formatted = formatted.replace(
        /"([^"]*)"/g, 
        '<span class="quote-highlight">$1</span>'
      );
      
      return formatted;
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
    disableInput() {
      this.isSending = true
    },
    enableInput() {
      this.isSending = false
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
.message-content :deep(.quote-highlight) {
  background-color: transparent;
  font-style: italic;
  /* padding: 2px 4px;
  border-radius: 3px;
  border-left: 3px solid #8a4fff; */
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

/* Indicador de digitação */
.typing-indicator {
  display: flex;
  align-items: flex-start;
  background-color: #d9cff5;
  color: #333333;
  padding: 5px 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  align-self: flex-start;
  width: 90%;
  animation: fadeInOut 2s infinite ease-in-out;
}

.typing-indicator .avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 10px;
  background-color: rgba(255, 255, 255, 0.5);
}

.typing-message {
  flex: 1;
  margin-top: 0.2rem;
  background-color: transparent;
  font-style: italic;
  color: #5a6472;
  font-weight: 500;
}

/* Animação de fade in/out */
@keyframes fadeInOut {
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
}

/* Animação alternativa mais suave */
@keyframes breathe {
  0%, 100% {
    opacity: 0.4;
    transform: scale(0.98);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Se preferir a animação breathe, substitua a linha da animação por: */
/* animation: breathe 2.5s infinite ease-in-out; */
</style>