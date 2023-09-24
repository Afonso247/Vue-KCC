<template>
  <div class="nav">
    <RouterLink to="/" class="logo_url">
      <img :src="logo" :alt="alt" class="logo" />
    </RouterLink>

    <RouterLink to="/">Criar Personagem</RouterLink>
    <RouterLink to="/personagens">Meus Personagens</RouterLink>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'Navbar',
  props: ['logo', 'alt']
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
  color: #5eb1bf;
  text-decoration: none;
  margin: 12px;
  transition: 0.4s;
}
.nav a:hover {
  color: #fff;
}
</style>
