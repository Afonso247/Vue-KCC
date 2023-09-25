<template>
  <div class="main-container">
    <h1>Gerenciar Personagens:</h1>
    <Dashboard />
  </div>
</template>

<script>
  import Dashboard from '../components/Dashboard.vue';

  export default {
    name: "PersonagensView",
    components: {
      Dashboard
    }
  }

</script>

<style scoped>

</style>
