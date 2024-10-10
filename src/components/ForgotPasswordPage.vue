<template>
  <div class="forgot">
    <form v-if="!isTokenGenerated" class="forgot-form" @submit.prevent="handleToken">
      <input type="email" placeholder="Insira seu E-mail" v-model="userEntry" />
      <button type="submit" class="confirm-btn">Recuperar Senha</button>
      <div class="forgot-req">
        <span
          >Lembrou a sua senha?<router-link class="forgot-link" :to="{ name: 'login' }"
            >Log In</router-link
          ></span
        >
      </div>
      <p v-show="errMessage" class="error-message">{{ errMessage }}</p>
    </form>
    <form v-else class="forgot-form" @submit.prevent="handleResetPwd">
      <input type="text" placeholder="Insira o token gerado" v-model="tokenEntry" />
      <input type="password" placeholder="Insira sua nova senha" autocomplete="off" v-model="password" />
      <input type="password" placeholder="Confirme a nova senha" autocomplete="off" v-model="confirmPassword" />
      <button type="submit" class="confirm-btn">Confirmar</button>
      <div class="forgot-req">
        <span
          >Lembrou a sua senha?<router-link class="forgot-link" :to="{ name: 'login' }"
            >Log In</router-link
          ></span
        >
      </div>
      <p v-show="errMessage" class="error-message">{{ errMessage }}</p>
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
      tokenEntry: '',
      password: '',
      confirmPassword: '',
      isTokenGenerated: false,
      errMessage: ''
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user'])
  },
  methods: {
    async handleToken() {
      if (this.userEntry === '') {
        this.errMessage = 'Preencha todos os campos.'
        return
      }
      try {
        const res = await axios.post(
          'http://localhost:3000/api/forgot-password',
          {
            email: this.userEntry
          }
        )

        if (res.status === 200) {
          this.isTokenGenerated = true
          return
        }
      } catch (error) {
        if (error.response.status === 400) {
          this.errMessage = error.response.data.message
          return
        } else {
          this.errMessage = 'Houve um erro ao gerar o token.'
          console.error(error)
        }
      }
    },
    async handleResetPwd() {
      if (this.tokenEntry === '', this.password === '', this.confirmPassword === '') {
        this.errMessage = 'Preencha todos os campos.'
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
        const res = await axios.post(
          'http://localhost:3000/api/reset-password',
          {
            token: this.tokenEntry,
            newPassword: this.password
          }
        )

        if (res.status === 200) {
          this.$router.push({ name: 'login' })
        }
      } catch (error) {
        if (error.response.status === 400) {
          this.errMessage = error.response.data.message
          return
        } else {
          this.errMessage = 'Houve um erro ao verificar o token.'
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
.forgot {
  display: block;
  color: #f08cae;
  font-size: 30px;
  text-align: center;
}
.forgot-form {
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
.forgot-req,
.forgot-link {
  font-size: 16px;
  text-align: center;
  margin: 6px 8px;
}
.forgot-link {
  color: #5eb1bf;
  text-decoration: none;
  transition: 0.2s;
}
.forgot-link:hover {
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
  .forgot-form {
    width: 400px;
  }
  input,
  button {
    width: 350px;
  }
}
@media (max-width: 500px) {
  .forgot-form {
    width: 300px;
  }
  input,
  button {
    width: 250px;
  }
}
@media (max-width: 400px) {
  .forgot-form {
    width: 250px;
  }
  input,
  button {
    width: 200px;
  }
}
@media (max-width: 359px) {
  .forgot-form {
    width: 200px;
  }
  input,
  button {
    width: 150px;
  }
}
</style>
