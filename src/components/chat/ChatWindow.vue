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
              {{ message.content }}
            </div>
          </div>
            <div 
              class="no-messages" 
              v-if="messages.length === 0"
            >
              Como você se sente hoje?
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
            isSending: false
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
</style>