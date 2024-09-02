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
  background-color: #222;
  border: none;
  border: 1px solid #444;
  border-radius: 5px;
}
.messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 10px;
  background-color: #222;
}
.message {
  padding: 5px 10px;
  margin-bottom: 20px;
  border-radius: 5px;
}
.message.user {
  background-color: #b8daff;
  align-self: flex-end;
}
.message.bot {
  background-color: #e07b99;
  color: #fff;
  align-self: flex-start;
}
.input-container {
  display: flex;
  width: 100%;
  max-width: 1200px;
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
</style>