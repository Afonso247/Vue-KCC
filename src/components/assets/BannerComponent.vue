<template>
  <div :class="['main-banner', typeLayout]" :style="{ backgroundImage: bannerLayout }">
    <h1>Estou aqui para ajudar!</h1>
    <!-- <span>Encontre apoio e suporte com a Kokomi, a IA dedicada a guiar você em cada passo da sua jornada para o bem-estar.</span> -->
    <!-- <div>Conheça a Kokomi</div> -->
  </div>
</template>

<script>
export default {
  name: 'BannerComponent',
  data() {
    return {
      typeLayout: 'Desktop'
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.typeLayout = window.innerWidth >= 901 ? 'Desktop' : 'Mobile'
    }
  },
  computed: {
    bannerLayout() {
      return this.typeLayout === 'Desktop'
        ? `url('/img/sangoDesktop.jpg')`
        : `url('/img/sangoMobile.jpg')`
    }
  }
}
</script>

<style scoped>
.main-banner {
  background-position: 0;
  background-size: cover;
  background-repeat: no-repeat;
  height: 500px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.main-banner h1 {
  color: #fff;
  text-align: center;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #c6b6f0;
  font-size: 60px;
  background-color: transparent;
  padding: 20px 40px;
}
</style>
