<template>
  <div class="login">
    <form class="login-form" @submit.prevent="handleLogin">
      <input type="text" placeholder="E-mail ou Nome de usuário" v-model="userEntry" />
      <input type="password" placeholder="Senha" autocomplete="off" v-model="password" />
      <button type="submit" class="confirm-btn">Log In</button>
      <div class="register-req">
        <span
          >Ainda não possui uma conta?<router-link class="register-link" :to="{ name: 'register' }"
            >Registrar-se</router-link
          ></span
        >
      </div>
      <div class="pwd-req">
        <span>
          <router-link class="pwd-link" :to="{ name: 'forgotpwd' }">
            Esqueci minha senha
          </router-link>
        </span>
      </div>
      <p v-show="loginMessage" class="error-message">{{ loginMessage }}</p>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: 'LogInPage',
  data() {
    return {
      userEntry: '',
      password: '',
      loginMessage: ''
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user'])
  },
  methods: {
    async handleLogin() {
      if (this.userEntry === '' || this.password === '') {
        this.loginMessage = 'Preencha todos os campos.'
        return
      }
      try {
        const res = await axios.post(
          'http://localhost:3000/api/login',
          {
            userEntry: this.userEntry,
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
        if (error.response.status === 400) {
          this.loginMessage = error.response.data.message
          return
        } else {
          this.loginMessage = 'Erro ao fazer login.'
          console.error(error)
        }
      }
    }
  },
  mounted() {
    if (this.isAuthenticated) {
      this.$router.push({ name: 'home' })
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
  border: 3px solid #d3c8f1;
  border-radius: 10px;
  width: 500px;
  margin: 0 auto;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.login-form input {
  background-color: #fff;
  color: #5a6472;
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
.pwd-req,
.pwd-link {
  font-size: 16px;
  text-align: center;
  margin: 6px 8px;
}
.pwd-link {
  color: #5eb1bf;
  text-decoration: none;
  transition: 0.2s;
}
.pwd-link:hover {
  color: #fff;
}
input {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
input,
button {
  width: 450px;
  margin: 10px auto;
}
.error-message {
  color: #ff4d4d;
  font-size: 16px;
  margin-top: 6px;
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
@media (max-width: 400px) {
  .login-form {
    width: 250px;
  }
  input,
  button {
    width: 200px;
  }
}
@media (max-width: 359px) {
  .login-form {
    width: 200px;
  }
  input,
  button {
    width: 150px;
  }
}
</style>
