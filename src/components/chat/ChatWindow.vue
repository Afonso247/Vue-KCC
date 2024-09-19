<template>
    <div class="chat-window">
        <div class="messages">
          <div
            v-for="(message, index) in messages"
            :key="index"
            :class="['message', message.role]"
          >
            <img
              :src="message.role === 'user' ? '/img/chatimg/user-placeholder.png' : '/img/chatimg/user-kokomi.png'"
              :alt="message.role === 'user' ? 'User Avatar' : 'Kokomai Avatar'"
              class="avatar"
            />
            <div class="message-content">
              <template v-if="index === messages.length - 1 && message.role === 'assistant' && isRevealing">
                {{ revealedText }}
              </template>
              <template v-else>
                {{ message.content }}
              </template>
            </div>
          </div>
            <div 
              class="no-messages" 
              v-if="messages.length === 0"
            >
              Como você se sente hoje?
            </div>
            <div v-if="currentLoadingPhrase" class="loading-message">
              {{ currentLoadingPhrase }}
            </div>
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
            <button 
                class="confirm-btn" 
                @click="sendMessage" 
                :disabled="isSending"
            >
                Enviar
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "ChatWindow",
    props: {
        messages: Array
    },
    data() {
        return {
            newMessage: "",
            isSending: false,
            isLoading: false,
            revealedText: "",
            isRevealed: false,
            currentLoadingPhrase: "",
            loadingPhrases: [
              "KokomAI está trabalhando duro para formular a sua resposta...",
              "KokomAI está se esforçando por você...",
              "KokomAI está em busca da melhor resposta...",
              "KokomAI está se dedicando por você..."
            ]
        };
    },
    methods: {
        sendMessage() {
            if (!this.newMessage || this.isSending) {
                return;
            }
            this.isSending = true
            this.$emit("send-message", this.newMessage)
            this.newMessage = ""
        },
        scrollToBottom() {
          this.$nextTick(() => {
            const messages = this.$el.querySelector(".messages");
            messages.scrollTop = messages.scrollHeight;
          });
        },
        enableInput() {
            this.isSending = false
        },
        async revealText(text) {
            this.isRevealing = true;
            this.revealedText = '';
            
            for (let i = 0; i < text.length; i++) {
                this.revealedText += text[i];
                await new Promise(resolve => setTimeout(resolve, 15)); // ajuste o valor após 'resolve' para controlar a velocidade
            }
            this.isRevealing = false;
        },
        startLoading() {
            this.isLoading = true;
            this.scrollToBottom();
            setTimeout(() => {
              if (this.isLoading) {
                this.currentLoadingPhrase = this.loadingPhrases[Math.floor(Math.random() * this.loadingPhrases.length)];
              }
            }, 3000);
        },
        stopLoading() {
            this.isLoading = false;
            this.currentLoadingPhrase = "";
        }
    },
}
</script>

<style scoped>
.chat-window {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #222;
  border: none;
  border: 1px solid #444;
  border-radius: 5px;
}
.messages {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-bottom: 10px;
  background-color: #222;
  position: relative;
}
.no-messages {
  background-color: transparent;
  color: #f08cae;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  @media (max-width: 600px) {
    font-size: 20px;
  }
}
.message {
  display: flex;
  align-items: flex-start;
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
  background-color: #b8daff;
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
  background-color: #e07b99;
  color: #fff;
  align-self: flex-start;
  width: 90%;
}
.input-container {
  display: flex;
  width: 90%;
  padding: 0 10px;
  background-color: #222;
}
.input-container input {
  width: 100%;
  padding: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
}
.input-container button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
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
.dot:nth-child(1) { animation-delay: -0.32s; }
.dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}
</style>