<template>
  <div class="main-container">
    <h1>404 - Página Não Encontrada</h1>
    <div class="container">
      <h2>Oops! A página que você está procurando não existe.</h2>
      <router-link class="link" :to="{ name: 'home' }">Voltar para a Página Inicial</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #485696;
  margin-top: 50px;
}

.link {
  color: #5eb1bf;
  margin-top: 10px;
  font-size: 18px;
  text-decoration: none;
  transition: 0.2s;
}
.link:hover {
  color: #fff;
}
</style>
