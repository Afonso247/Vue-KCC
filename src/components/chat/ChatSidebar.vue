<template>
    <div class="chat-sidebar" :class="{ hidden: !showSidebar }">
        <button class="close-button" @click="$emit('toggle-sidebar')" v-if="isMobile">
            <XMarkIcon class="icon" />
        </button>
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
import { XMarkIcon } from '@heroicons/vue/24/solid'

export default {
    name: 'ChatSidebar',
    components: {
        XMarkIcon
    },
    props: {
        chats: Array,
        activeChatId: Number,
        showSidebar: Boolean
    },
    data() {
        return {
            isMobile: window.innerWidth <= 768
        };
    },
    methods: {
        createChat() {
            this.$emit('create-chat');
        },
        selectChat(chatId) {
            this.$emit('select-chat', chatId);
        },
        handleResize() {
            this.isMobile = window.innerWidth <= 768;
        }
    },
    created() {
        window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
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
  position: relative;
}

.hidden {
  display: none;
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
  margin-bottom: 10px;
  background-color: #485696;
  transition: background-color 0.2s;
}

.chat-sidebar li.active {
  background-color: #cce5ff;
}

.chat-sidebar li:hover {
  background-color: #f08cae;
}

.chat-sidebar .confirm-btn {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
}

.chat-sidebar .close-button {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  margin-bottom: 10px;
}

.icon {
  width: 20px;
  height: 20px;
  background-color: #333;
}

@media (max-width: 768px) {
  .chat-sidebar {
    width: 100%;
  }
}

/* .chat-sidebar button:hover {
  background-color: #3e8e41;
} */
</style>