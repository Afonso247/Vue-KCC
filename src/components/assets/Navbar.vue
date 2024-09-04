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
        class="nav-link"
        @click="handleClick(link)"
      >
        <component :is="link.icon" class="icon" />
        {{ link.text }}
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { RouterLink } from 'vue-router'
import {
  HomeIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  UserPlusIcon
} from '@heroicons/vue/24/solid'

export default {
  name: 'NavBar',
  props: ['logo', 'alt'],
  components: {
    RouterLink,
    HomeIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
    ArrowLeftOnRectangleIcon,
    UserPlusIcon
  },
  data() {
    return {
      authInterval: null,
      authenticatedLinks: [
        { to: '/userconfig', text: 'Configurações', icon: 'Cog6ToothIcon' },
        { to: '/', text: 'Logout', icon: 'ArrowRightOnRectangleIcon' }
      ],
      unauthenticatedLinks: [
        { to: '/login', text: 'Log In', icon: 'ArrowLeftOnRectangleIcon' },
        { to: '/register', text: 'Registrar-se', icon: 'UserPlusIcon' }
      ]
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    authContent() {
      return this.isAuthenticated ? this.authenticatedLinks : this.unauthenticatedLinks
    }
  },
  methods: {
    ...mapActions('auth', ['checkAuth', 'logout']),
    handleClick(link) {
      if (link.text === 'Logout') {
        this.logout()
        this.$router.push({ name: 'home' })
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
.icon {
  width: 16px;
  height: 16px;
  margin-right: 3px;
  vertical-align: sub;
  background-color: transparent;
}
.nav .logo_url {
  margin: auto;
  margin-left: 0;
  transition: 0.2s;
}
.logo {
  background-color: #222;
  width: 40px;
  height: 40px;
}
.logo_url:hover {
  transform: scale(1.25);
}
.nav a {
  background-color: #222;
  color: #f08cae;
  text-decoration: none;
  margin: 12px;
  transition: 0.2s;
}
.nav a:hover {
  color: #fff;
}
@media (max-width: 420px) {
  .nav-content {
    flex-direction: column;
    align-items: center;
  }
  .nav-link {
    display: flex;
    align-items: center;
    margin: 10px 0;
  }
  .logo_url {
    margin: 10px auto;
  }
  .nav a {
    margin: 5px 0;
  }
}
</style>
