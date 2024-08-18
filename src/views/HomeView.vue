<template>
  <Banner />
  <div class="main-container">
    <!-- <h1>Crie um Grupo de Personagens</h1> -->
    <Home />
  </div>
</template>

<script>
import Banner from '../components/Banner.vue'
import Home from '../components/HomePage.vue'

export default {
  name: 'HomeView',
  components: {
    Banner,
    Home
  }
}
</script>
