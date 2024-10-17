<template>
  <div class="main-container">
    <h1>Recuperar senha:</h1>
    <ForgotPwd />
  </div>
</template>

<script>
import ForgotPwd from '../components/ForgotPasswordPage.vue'

export default {
  name: 'ForgotPasswordView',
  components: {
    ForgotPwd
  }
}
</script>

<style scoped></style>
