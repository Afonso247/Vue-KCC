<template>
  <div class="login">
    <form class="login-form" @submit.prevent="login">
      <input type="text" placeholder="Nome de usuário" v-model="username" />
      <input type="password" placeholder="Senha" autocomplete="off" v-model="password" />
      <button type="submit" class="confirm-btn">Log In</button>
      <div class="register-req">
        <span
          >Ainda não possui uma conta?<router-link class="register-link" :to="{ name: 'register' }"
            >Registrar-se</router-link
          ></span
        >
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LogInPage',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        const res = await axios.post(
          'http://localhost:3000/api/login',
          {
            username: this.username,
            password: this.password
          },
          {
            withCredentials: true
          }
        )

        if (res.status === 200) {
          this.$router.push({ name: 'home' })
        }
      } catch (error) {
        console.log(error.response)
      }
    }
  }
}
</script>

<style scoped>
.login {
  display: block;
  color: #f08cae;
  font-size: 30px;
  text-align: center;
}
.login-form {
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
.register-req,
.register-link {
  font-size: 16px;
  text-align: center;
  margin: 6px 8px;
}
.register-link {
  color: #5eb1bf;
  text-decoration: none;
  transition: 0.2s;
}
.register-link:hover {
  color: #fff;
}
input,
button {
  width: 450px;
  margin: 10px auto;
}
@media (max-width: 600px) {
  .login-form {
    width: 400px;
  }
  input,
  button {
    width: 350px;
  }
}
@media (max-width: 500px) {
  .login-form {
    width: 300px;
  }
  input,
  button {
    width: 250px;
  }
}
</style>
