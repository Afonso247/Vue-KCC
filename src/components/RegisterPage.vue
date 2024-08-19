<template>
    <div class="register">
      <form class="register-form" @submit.prevent="registerUser">
        <input type="text" placeholder="Nome de usuário" v-model="username">
        <input type="password" placeholder="Senha" autocomplete="off" v-model="password">
        <input type="password" placeholder="Confirmar senha" autocomplete="off" v-model="confirmPassword">
        <button type="submit" class="confirm-btn">Registrar</button>
        <div class="login-req">
          <span>Ja possui uma conta?<router-link class="login-link" :to="{ name: 'login' }">Log In</router-link></span>
        </div>
      </form>
    </div>
  </template>
  
<script>
import axios from 'axios'

export default {
  name: 'RegisterPage',
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    async registerUser() {
      if (this.password !== this.confirmPassword) {
        alert('As senhas devem ser iguais')
        return
      } else if (this.password.length < 8) {
        alert('A senha deve ter pelo menos 8 caracteres')
        return
      }
      try {
        const res = await axios.post('http://localhost:3000/api/register', {
          username: this.username,
          password: this.password
        })

        if (res.status === 201) {
          this.$router.push({ name: 'login' })
        }

      } catch (error) {
        if(error.response.status === 400) {
          alert(error.response.data.message)
        } else {
          alert('Erro ao registrar o usuário')
          console.log(error)
        }
      }
    }
  }
}
</script>
  
<style scoped>
  .register {
    display: block;
    color: #f08cae;
    font-size: 30px;
    text-align: center;
  }
  .register-form {
    border: 3px solid #333333;
    border-radius: 10px;
    width: 500px;
    margin: 0 auto;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .login-req, .login-link {
    font-size: 16px;
    text-align: center;
    margin: 6px 8px;
  }
  .login-link {
    color: #5eb1bf;
    text-decoration: none;
    transition: 0.2s;
  }
  .login-link:hover {
    color: #fff;
  }
  input, button {
    width: 450px;
    margin: 10px auto;
  }
  @media (max-width: 600px) {
    .register-form {
      width: 400px;
    }
    input, button {
      width: 350px;
    }
  }
  @media (max-width: 500px) {
    .register-form {
      width: 300px;
    }
    input, button {
      width: 250px;
    }
  }
</style>