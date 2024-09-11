<script>
import { RouterView } from 'vue-router'
import NavBar from './components/assets/Navbar.vue'
import Footer from './components/assets/Footer.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    RouterView,
    Footer
  },
  data() {
    return {
      logo_src: '/img/kokomi.png',
      app_name: "Kokomi's Mindspace"
    }
  }
}
</script>

<template>
  <div class="app-container">
    <NavBar :logo="logo_src" :alt="app_name" />
    <main class="content">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style>
html, body {
  height: 100%;
  margin: 0;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1 0 auto;
  padding-top: 80px;
}

body {
  padding-top: 0;
}
</style>