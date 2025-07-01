<template>
  <div v-if="isAuthenticated" @click="checkClose($event)">
    <h1>Olá, {{ getUsername }} !</h1>

    <Chat ref="chat" />
  </div>
  <div v-else>
    <h1>Seja bem-vindo(a) a Kokomi's Mindspace</h1>

    <div class="container">
      <h2>
        <router-link class="links" :to="{ name: 'login' }">Faça login</router-link> e começe agora
        mesmo!
      </h2>
      <h2>
        Ainda não possui uma conta?
        <router-link class="links" :to="{ name: 'register' }">Registre-se!</router-link>
      </h2>
    </div>
  </div>
</template>

<script>
import Chat from './chat/ChatComponent.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'HomePage',
  components: {
    Chat
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    getUsername() {
      return this.isAuthenticated ? this.user.username : ''
    }
  },
  methods: {
    checkClose(event) {
      if (!event.target.closest('.chat-sidebar')) {
        // caminho: HomePage -> ChatComponent -> ChatSidebar
        this.$refs.chat.checkClose(event)
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.container h2 {
  color: #5a6472;
  text-align: center;
  margin: 6px auto;
}
.links {
  color: #4fa3d1;
  text-decoration: none;
  transition: 0.2s;
}
.links:hover {
  color: #356b9a;
}

@media screen and (max-width: 768px) {
  .container {
    max-width: 400px;
  }
}
@media screen and (max-width: 480px) {
  .container {
    max-width: 300px;
  }
}
</style>
