<template>
  <Banner />
  <div class="main-container">
    <Home />
  </div>
</template>

<script>
import Banner from '../components/assets/BannerComponent.vue'
import Home from '../components/HomePage.vue'

export default {
  name: 'HomeView',
  components: {
    Banner,
    Home
  }
}
</script>
