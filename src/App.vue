<script>
import { RouterView } from 'vue-router'
import NavBar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    RouterView,
    // eslint-disable-next-line vue/no-reserved-component-names
    Footer
  },
  data() {
    return {
      logo_src: '/img/kokomi.png',
      app_name: "Kokomi's Character Creator"
    }
  }
}
</script>

<template>
  <NavBar :logo="logo_src" :alt="app_name" />
  <RouterView />
  <Footer />
</template>

<style></style>
