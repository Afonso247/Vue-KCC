<template>
  <div :class="['main-banner', typeLayout]" :style="{ backgroundImage: bannerLayout }">
    <h1>Estou aqui para ajudar!</h1>
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
        ? `url('/img/ana-bg.png')`
        : `url('/img/ana-bg-mobile.png')`
    }
  }
}
</script>
<style scoped>
.main-banner {
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 500px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* Estilos específicos para Desktop */
.main-banner.Desktop {
  background-attachment: fixed;
}

/* Estilos específicos para Mobile */
.main-banner.Mobile {
  background-attachment: scroll;
  background-position: center top;
}

.main-banner h1 {
  color: #fff;
  text-align: center;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #c6b6f0;
  font-size: 60px;
  background-color: transparent;
  padding: 20px 40px;
  position: relative;
  z-index: 1;
}

/* Responsividade para o texto */
@media (max-width: 900px) {
  .main-banner h1 {
    font-size: 40px;
    padding: 15px 20px;
    -webkit-text-stroke-width: 1px;
  }
}

@media (max-width: 600px) {
  .main-banner h1 {
    font-size: 28px;
    padding: 10px 15px;
  }
}

/* Garantir que o banner seja responsivo em todas as larguras */
@media (min-width: 1200px) {
  .main-banner {
    background-size: cover;
  }
}

@media (max-width: 1199px) and (min-width: 769px) {
  .main-banner {
    background-size: cover;
  }
}

@media (max-width: 768px) {
  .main-banner {
    background-size: cover;
    background-position: center center;
  }
}
</style>
