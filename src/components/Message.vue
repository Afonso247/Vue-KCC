<template>
  <div :class="['message-container', tipo]">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    msg: String,
    tipo: String
  }
}
</script>

<style scoped>
.message-container {
  text-align: center;
  border-radius: 5px;
  padding: 10px;
  max-width: 400px;
  margin: 30px auto;
}

.message-container.confirmation {
  color: #485696;
  background-color: #cce5ff;
  border: 2px solid #b8daff;
}
.message-container.delete {
  color: #485696;
  background-color: #f8d7da;
  border: 2px solid #f5c6cb;
}
</style>
