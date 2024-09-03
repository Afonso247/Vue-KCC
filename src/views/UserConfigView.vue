<template>
  <div class="main-container">
    <h1>Configurações da conta:</h1>
    <UserConfig />
  </div>
</template>

<script>
import UserConfig from '../components/UserConfigPage.vue'

export default {
  name: 'UserConfigView',
  components: {
    UserConfig
  }
}
</script>

<style scoped></style>
