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
        <img src="/img/chatimg/user-ana.png" alt="Ana Avatar" class="avatar" />
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
      if (!text) return ''

      let formatted = text

      // Escapar HTML para prevenir XSS
      formatted = formatted.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

      // Formatação de código em bloco (```código```)
      formatted = formatted.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        const language = lang ? ` class="language-${lang}"` : ''
        return `<pre><code${language}>${code.trim()}</code></pre>`
      })

      // Código inline (`código`)
      formatted = formatted.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')

      // Negrito (**texto** ou __texto__)
      formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      formatted = formatted.replace(/__(.+?)__/g, '<strong>$1</strong>')

      // Itálico (*texto* ou _texto_)
      formatted = formatted.replace(/\*(.+?)\*/g, '<em>$1</em>')
      formatted = formatted.replace(/_(.+?)_/g, '<em>$1</em>')

      // Tachado (~~texto~~)
      formatted = formatted.replace(/~~(.+?)~~/g, '<del>$1</del>')

      // Títulos (# Título)
      formatted = formatted.replace(/^### (.+)$/gm, '<h3>$1</h3>')
      formatted = formatted.replace(/^## (.+)$/gm, '<h2>$1</h2>')
      formatted = formatted.replace(/^# (.+)$/gm, '<h1>$1</h1>')

      // Links [texto](url)
      formatted = formatted.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
      )

      // Citações (> texto)
      formatted = formatted.replace(
        /^&gt; (.+)$/gm,
        '<blockquote class="quote-highlight">$1</blockquote>'
      )

      // Listas não ordenadas (- item ou * item)
      formatted = formatted.replace(/^[*-] (.+)$/gm, '<li>$1</li>')
      formatted = formatted.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')

      // Listas ordenadas (1. item)
      formatted = formatted.replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
      // Esta regex captura sequências de <li> que não estão em <ul>
      formatted = formatted.replace(/(?<!<ul>)(<li>.*<\/li>\n?)+(?!<\/ul>)/g, '<ol>$&</ol>')

      // Linha horizontal (--- ou ***)
      formatted = formatted.replace(/^(---|___|\*\*\*)$/gm, '<hr>')

      // Quebras de linha (duas quebras = novo parágrafo)
      formatted = formatted.replace(/\n\n/g, '</p><p>')
      formatted = `<p>${formatted}</p>`

      // Quebra de linha simples
      formatted = formatted.replace(/\n/g, '<br>')

      // Limpar parágrafos vazios
      formatted = formatted.replace(/<p><\/p>/g, '')
      formatted = formatted.replace(/<p>\s*<\/p>/g, '')

      // Limpar tags vazias de lista
      formatted = formatted.replace(/<ul>\s*<\/ul>/g, '')
      formatted = formatted.replace(/<ol>\s*<\/ol>/g, '')

      return formatted
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
        if (messages) {
          messages.scrollTop = messages.scrollHeight
        }
      })
    },
    disableInput() {
      this.isSending = true
    },
    enableInput() {
      this.isSending = false
    }
  },
  watch: {
    messages: {
      handler() {
        this.scrollToBottom()
      },
      deep: true
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
  padding: 12px 10px;
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
  line-height: 1.6;
}

/* Formatação de texto */
.message-content :deep(p) {
  margin: 0.5em 0;
  background-color: transparent;
}

.message-content :deep(p:first-child) {
  margin-top: 0;
}

.message-content :deep(p:last-child) {
  margin-bottom: 0;
}

.message-content :deep(strong) {
  font-weight: 700;
  color: #2c3e50;
  background-color: transparent;
}

.message-content :deep(em) {
  font-style: italic;
  background-color: transparent;
}

.message-content :deep(del) {
  text-decoration: line-through;
  opacity: 0.7;
  background-color: transparent;
}

/* Código */
.message-content :deep(code.inline-code) {
  background-color: rgba(0, 0, 0, 0.08);
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

.message-content :deep(pre) {
  background-color: #2d2d2d;
  color: #f8f8f2;
  padding: 12px;
  border-radius: 5px;
  overflow-x: auto;
  margin: 10px 0;
}

.message-content :deep(pre code) {
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  line-height: 1.5;
}

/* Títulos */
.message-content :deep(h1) {
  font-size: 1.8em;
  font-weight: 700;
  margin: 0.8em 0 0.4em 0;
  color: #2c3e50;
  background-color: transparent;
}

.message-content :deep(h2) {
  font-size: 1.5em;
  font-weight: 700;
  margin: 0.7em 0 0.3em 0;
  color: #2c3e50;
  background-color: transparent;
}

.message-content :deep(h3) {
  font-size: 1.3em;
  font-weight: 700;
  margin: 0.6em 0 0.3em 0;
  color: #2c3e50;
  background-color: transparent;
}

/* Links */
.message-content :deep(a) {
  color: #667eea;
  text-decoration: none;
  border-bottom: 1px solid #667eea;
  transition: all 0.2s ease;
}

.message-content :deep(a:hover) {
  color: #764ba2;
  border-bottom-color: #764ba2;
}

/* Citações */
.message-content :deep(blockquote) {
  background-color: transparent;
  font-style: italic;
  padding: 8px 12px;
  margin: 10px 0;
  border-left: 4px solid #667eea;
  color: #555;
}

.message-content :deep(.quote-highlight) {
  background-color: transparent;
  font-style: italic;
}

/* Listas */
.message-content :deep(ul),
.message-content :deep(ol) {
  margin: 10px 0;
  padding-left: 25px;
  background-color: transparent;
}

.message-content :deep(li) {
  margin: 5px 0;
  line-height: 1.6;
  background-color: transparent;
}

.message-content :deep(ul) {
  list-style-type: disc;
}

.message-content :deep(ol) {
  list-style-type: decimal;
}

/* Linha horizontal */
.message-content :deep(hr) {
  border: none;
  border-top: 2px solid #e0e0e0;
  margin: 15px 0;
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
  0%,
  100% {
    opacity: 0.4;
    transform: scale(0.98);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
