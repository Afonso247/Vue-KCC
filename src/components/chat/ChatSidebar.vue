<template>
  <div
    class="chat-sidebar"
    :class="{ hidden: !showSidebar, 'mobile-sidebar': isMobile }"
    @click.self="closeOptions()"
  >
    <button class="close-button" @click="$emit('toggle-sidebar')">
      <XMarkIcon class="icon" />
    </button>
    <p :class="{ showing: errorMsg }">{{ errorMsg }}</p>
    <button class="confirm-btn" @click="createChat">Novo Chat</button>

    <ul>
      <li
        v-for="chat in chats"
        :key="chat.id"
        :class="{ active: chat._id === activeChatId }"
        @click="selectChat(chat._id)"
      >
        {{ chat.name }}
        <div class="options-container" @click.stop>
          <button class="options-btn" @click="toggleOptions(chat._id)">
            <EllipsisHorizontalIcon class="icon" />
          </button>
          <div v-if="showOptionsId === chat._id" class="dropdown-menu">
            <button @click="renameChat(chat._id)">Renomear</button>
            <button @click="deleteChat(chat._id)">Excluir</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { XMarkIcon, EllipsisHorizontalIcon } from '@heroicons/vue/24/solid'

export default {
  name: 'ChatSidebar',
  components: {
    XMarkIcon,
    EllipsisHorizontalIcon
  },
  props: {
    chats: Array,
    activeChatId: String,
    showSidebar: Boolean,
    errorMsg: String
  },
  data() {
    return {
      isMobile: window.innerWidth <= 900,
      showOptionsId: null
    }
  },
  methods: {
    createChat() {
      this.$emit('create-chat')
    },
    selectChat(chatId) {
      this.$emit('select-chat', chatId)
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 900
    },
    toggleOptions(chatId) {
      this.showOptionsId = this.showOptionsId === chatId ? null : chatId
    },
    closeOptions() {
      this.showOptionsId = null
    },
    renameChat(chatId) {
      this.$emit('rename-modal', chatId)
      this.showOptionsId = null
    },
    deleteChat(chatId) {
      this.$emit('delete-modal', chatId)
      this.showOptionsId = null
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style scoped>
.chat-sidebar {
  display: flex;
  flex-direction: column;
  width: 22%;
  min-width: 230px;
  padding: 20px;
  background-color: #d9cff5;
  border: 2px solid #d3c8f1;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.chat-sidebar.hidden {
  display: none;
}

.chat-sidebar ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
}

.chat-sidebar li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  background-color: #b8e1ff;
  transition: background-color 0.2s;
}

.chat-sidebar li.active {
  background-color: #c6b6f0;
}

.chat-sidebar li:hover {
  background-color: #7ea8d1;
}

.chat-sidebar p {
  margin-bottom: 10px;
  text-align: center;
  color: #ff0000;
  background-color: transparent;
  display: none;
}
.chat-sidebar p.showing {
  display: block;
}

.chat-sidebar .confirm-btn {
  width: 100%;
  padding: 10px;
  margin: 0 auto 20px;
}

.chat-sidebar .close-button {
  display: flex;
  width: 40px;
  justify-content: center;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  margin-bottom: 20px;
  margin-left: -14px;
}

.chat-sidebar .close-button:hover {
  color: #f08cae;
  transition: color 0.2s;
}

.icon {
  width: 20px;
  height: 20px;
  background-color: transparent;
}

.options-container {
  position: relative;
  background-color: transparent;
}

.options-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #111;
  font-size: 18px;
}

.options-btn:hover {
  color: #fff;
}

.dropdown-menu {
  position: absolute;
  right: -5px;
  top: 100%;
  background-color: #444;
  border: 1px solid #666;
  border-radius: 5px;
  padding: 5px;
  z-index: 1000;
}

.dropdown-menu button {
  display: block;
  background: none;
  border: none;
  color: #fff;
  padding: 5px 10px;
  cursor: pointer;
  width: 100%;
  text-align: left;
}

.dropdown-menu button:hover {
  background-color: #555;
}

@media (max-width: 900px) {
  .chat-sidebar {
    width: calc(100% - 20px);
    min-width: 0;
    margin-bottom: 6px;
    position: fixed;
    top: 10px;
    left: 10px;
  }
  .chat-sidebar.mobile-sidebar {
    z-index: 100;
    position: absolute;
  }
}
</style>
