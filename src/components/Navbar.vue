<template>
  <div class="nav">
    <RouterLink to="/" class="logo_url">
      <img :src="logo" :alt="alt" class="logo" />
    </RouterLink>
    <div class="nav-content">
      <RouterLink
        v-for="(link, index) in authContent"
        :key="index"
        :to="link.to"
        @click="handleClick(link)"
      >
        {{ link.text }}
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { RouterLink } from 'vue-router'

export default {
  name: 'NavBar',
  props: ['logo', 'alt'],
  components: { RouterLink },
  data() {
    return {
      authInterval: null,
      authenticatedLinks: [
        { to: "/", text: "Logout" },
        // { to: "/", text: "Crie um Grupo" },
        // { to: "/personagens", text: "Meus Grupos" }
      ],
      unauthenticatedLinks: [
        { to: "/login", text: "Log In" },
        { to: "/register", text: "Registrar-se" },
        // { to: "/", text: "Crie um Grupo" }
      ],
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    authContent() {
      return this.isAuthenticated ? this.authenticatedLinks : this.unauthenticatedLinks;
    }
  },
  methods: {
    ...mapActions('auth', ['checkAuth', 'logout']),
    handleClick(link) {
      if (link.text === "Logout") {
        this.logout();
        this.$router.push({ name: "home" });
      }
    }
  }
}
</script>

<style scoped>
.nav {
  background-color: #222;
  border-bottom: 4px solid #111;
  padding: 15px 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.nav-content {
  background-color: #222;
}
.nav .logo_url {
  margin: auto;
  margin-left: 0;
}
.logo {
  background-color: #222;
  width: 40px;
  height: 40px;
}
.nav a {
  background-color: #222;
  color: #f08cae;
  text-decoration: none;
  margin: 12px;
  transition: 0.4s;
}
.nav a:hover {
  color: #fff;
}
</style>
