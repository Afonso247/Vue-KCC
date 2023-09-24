<template>
  <div class="main-banner">
    <h1>Kokomi's Character Creator</h1>
  </div>
</template>

<script>
export default {
  name: 'Banner'
}
</script>

<style scoped>
.main-banner {
  background-image: url('/img/sango.jpeg');
  background-position: 0;
  background-size: cover;
  background-repeat: no-repeat;
  height: 500px;
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
</style>
