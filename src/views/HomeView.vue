<template>
  <Banner />
  <div class="main-container">
    <h1>Crie seu Personagem</h1>
    <CharacterForm />
  </div>
</template>

<script>
  import Banner from '../components/Banner.vue'
  import CharacterForm from '../components/CharacterForm.vue'

  export default {
    name: 'HomeView',
    components: {
      Banner,
      CharacterForm
    }
  }
</script>
