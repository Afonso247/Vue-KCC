<template>
  <div class="nav">
    <RouterLink to="/" class="logo_url">
      <img :src="logo" :alt="alt" class="logo" />
    </RouterLink>
    <RouterLink to="/login">Log In</RouterLink>
    <RouterLink to="/register">Registrar-se</RouterLink>
    <RouterLink to="/">Crie um Grupo</RouterLink>
    <RouterLink to="/personagens">Meus Grupos</RouterLink>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'NavBar',
  props: ['logo', 'alt'],
  components: { RouterLink }
}
</script>

<style scoped>
.nav {
  background-color: #222;
  border-bottom: 4px solid #111;
  padding: 15px 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.nav .logo_url {
  margin: auto;
  margin-left: 0;
}
.logo {
  background-color: #222;
  width: 40px;
  height: 40px;
}
.nav a {
  background-color: #222;
  color: #f08cae;
  text-decoration: none;
  margin: 12px;
  transition: 0.4s;
}
.nav a:hover {
  color: #fff;
}
</style>
