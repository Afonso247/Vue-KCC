<template>
    <div class="chat-sidebar">
        <button class="confirm-btn" @click="createChat">Novo Chat</button>

        <ul>
            <li 
                v-for="chat in chats" 
                :key="chat.id"
                :class="{ active: chat.id === activeChatId }"
                @click="selectChat(chat.id)"
            >
                {{ chat.name }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'ChatSidebar',

    props: {
        chats: Array,
        activeChatId: Number
    },

    methods: {
        createChat() {
            this.$emit('create-chat');
        },

        selectChat(chatId) {
            this.$emit('select-chat', chatId);
        }
    }
};
</script>

<style scoped>
.chat-sidebar {
  width: 300px;
  padding: 20px;
  background-color: #333;
  border: 1px solid #444;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.chat-sidebar ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: #333;
}

.chat-sidebar li {
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 5px;
  background-color: #485696;
  transition: background-color 0.2s;
}

.chat-sidebar li.active {
  background-color: #cce5ff;
}

.chat-sidebar li:hover {
  background-color: #f08cae;
}

.chat-sidebar button {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
}

/* .chat-sidebar button:hover {
  background-color: #3e8e41;
} */
</style>