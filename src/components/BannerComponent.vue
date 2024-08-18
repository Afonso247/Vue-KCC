<template>
  <div :class="['main-banner', typeLayout]">
    <h1>Kokomi's Mindspace</h1>
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
    // headerText() {
    //   return this.typeLayout === 'Desktop' ? 'Kokomi\'s Mindspace' : 'Bem-vindo!'
    // }
  }
}
</script>

<style scoped>
.main-banner {
  background-position: 0;
  background-size: cover;
  background-repeat: no-repeat;
  height: 600px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.main-banner h1 {
  color: #f08cae;
  text-align: center;
  font-size: 60px;
  background-color: transparent;
  padding: 20px 40px;
}
.main-banner.Desktop {
  background-image: url('/img/sangoDesktop.jpg');
}
.main-banner.Mobile {
  background-image: url('/img/sangoMobile.jpg');
}
</style>
