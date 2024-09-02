<template>
    <div class="chat-window">
        <div class="messages">
            <div
                v-for="(message, index) in messages"
                :key="index"
                :class="['message', message.sender]"
            >
                {{ message.text }}
            </div>
        </div>
        <div class="input-container">
            <input
                type="text"
                v-model="newMessage"
                @keyup.enter="sendMessage"
                placeholder="Digite sua mensagem..."
            />
            <button class="confirm-btn" @click="sendMessage">Enviar</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        messages: Array
    },
    data() {
        return {
            newMessage: "",
        };
    },
    methods: {
        sendMessage() {
            if (!this.newMessage) {
                return;
            }
            this.$emit("send-message", this.newMessage);
            this.newMessage = "";
        },
    },
}
</script>

<style scoped>
.chat-window {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 10px;
}
.message {
  padding: 5px 10px;
  margin-bottom: 5px;
  border-radius: 5px;
}
.message.user {
  background-color: #e1ffc7;
  align-self: flex-end;
}
.message.bot {
  background-color: #f1f1f1;
  align-self: flex-start;
}
.input-container {
  display: flex;
}
.input-container input {
  flex: 1;
  padding: 10px;
}
.input-container button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
}
</style>