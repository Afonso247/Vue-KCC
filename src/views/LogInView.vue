<template>
    <div class="main-container">
      <h1>Fazer Login:</h1>
      <Login />
    </div>
  </template>
  
  <script>
  import Login from '../components/LogInPage.vue'
  
  export default {
    name: 'PersonagensView',
    components: {
      Login
    }
  }
  </script>
  
  <style scoped></style>