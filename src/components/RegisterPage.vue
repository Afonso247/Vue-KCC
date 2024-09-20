<template>
  <div class="register">
    <form class="register-form" @submit.prevent="registerUser">
      <input type="text" placeholder="Nome de usuário" v-model="username" />
      <input type="password" placeholder="Senha" autocomplete="off" v-model="password" />
      <input
        type="password"
        placeholder="Confirmar senha"
        autocomplete="off"
        v-model="confirmPassword"
      />
      <button type="submit" class="confirm-btn">Registrar</button>
      <div class="login-req">
        <span
          >Ja possui uma conta?<router-link class="login-link" :to="{ name: 'login' }"
            >Log In</router-link
          ></span
        >
      </div>
      <p v-show="registerMessage" class="error-message">{{ registerMessage }}</p>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: 'RegisterPage',
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      registerMessage: ''
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user'])
  },
  methods: {
    async registerUser() {
      if (!this.username || !this.password || !this.confirmPassword) {
        this.registerMessage = 'Preencha todos os campos.'
        return
      }
      if (this.password.length < 8) {
        this.registerMessage = 'A senha deve ter pelo menos 8 caracteres.'
        return
      }
      if (this.password !== this.confirmPassword) {
        this.registerMessage = 'As senhas devem ser iguais.'
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
        if (error.response.status === 400) {
          alert(error.response.data.message)
        } else {
          this.registerMessage = 'Erro ao registrar o usuário.'
          console.log(error)
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
.login-req,
.login-link {
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
.error-message {
  color: #ff4d4d;
  font-size: 16px;
  margin-top: 6px;
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
@media (max-width: 600px) {
  .register-form {
    width: 400px;
  }
  input,
  button {
    width: 350px;
  }
}
@media (max-width: 500px) {
  .register-form {
    width: 300px;
  }
  input,
  button {
    width: 250px;
  }
}
@media (max-width: 400px) {
  .register-form {
    width: 250px;
  }
  input,
  button {
    width: 200px;
  }
}
@media (max-width: 359px) {
  .register-form {
    width: 200px;
  }
  input,
  button {
    width: 150px;
  }
}
</style>
