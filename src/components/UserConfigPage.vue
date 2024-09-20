<template>
  <div class="settings-page">
    <section class="settings-section config-zone">
      <h2 class="config-title">Mudar Nome de Usuário</h2>
      <form @submit.prevent="updateUsername">
        <div class="form-group">
          <label for="username">Novo Nome de Usuário:</label>
          <input
            type="text"
            autocomplete="off"
            v-model="newUsername"
            placeholder="Insira o novo nome de usuário"
          />
        </div>
        <button type="submit" class="confirm-btn" style="text-align: center">
          Salvar Nome de Usuário
        </button>
        <p v-show="usernameMessage" :class="usernameMessageClass">{{ usernameMessage }}</p>
      </form>
    </section>

    <section class="settings-section config-zone">
      <h2 class="config-title">Mudar Senha</h2>
      <form @submit.prevent="updatePassword">
        <div class="form-group">
          <label for="current-password">Senha Atual:</label>
          <input
            type="password"
            autocomplete="off"
            v-model="currentPassword"
            placeholder="Insira a senha atual"
          />
        </div>
        <div class="form-group">
          <label for="new-password">Nova Senha:</label>
          <input
            type="password"
            autocomplete="off"
            v-model="newPassword"
            placeholder="Insira a nova senha"
          />
        </div>
        <div class="form-group">
          <label for="new-password">Confirmar Nova Senha:</label>
          <input
            type="password"
            autocomplete="off"
            v-model="confirmNewPassword"
            placeholder="Insira a nova senha"
          />
        </div>
        <button type="submit" class="confirm-btn">Salvar Nova Senha</button>
        <p v-show="passwordMessage" :class="passwordMessageClass">{{ passwordMessage }}</p>
      </form>
    </section>

    <section class="settings-section danger-zone">
      <h2 class="danger-title">Zona de Perigo</h2>
      <div v-if="!dangerConfirmation">
        <button @click="confirmDelete" class="cancel-btn">Remover Conta</button>
      </div>
      <div v-else>
        <p class="danger-text">
          Para confirmar a remoção de sua conta, digite:
          <strong style="color: #ff4d4d">{{ confirmationText }}</strong>
        </p>
        <input type="text" v-model="deleteInput" placeholder="Digite a mensagem de confirmação" />
        <div class="delete-btns">
          <button @click="cancelDelete" class="confirm-btn">Cancelar Ação</button>
          <button
            v-if="deleteInput === confirmationText"
            @click="handleDeleteAccount"
            class="cancel-btn"
          >
            Confirmar Ação
          </button>
        </div>
        <p v-if="deleteInput === confirmationText" class="error-message">{{ deleteMessage }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: 'UserConfigPage',
  data() {
    return {
      newUsername: '',
      usernameMessage: '',
      usernameMessageClass: '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      passwordMessage: '',
      passwordMessageClass: '',
      deleteInput: '',
      deleteMessage: 'Ao clicar em "Confirmar Ação", sua conta será permanentemente excluída.',
      confirmationText: 'REMOVER-MINHA-CONTA',
      dangerConfirmation: false
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user'])
  },
  methods: {
    async updateUsername() {
      
      const errors = {
        empty: 'Insira um nome de usuário.',
        minLength: 'O nome de usuário deve ter pelo menos 3 caracteres.',
        sameUsername: 'O novo nome de usuário deve ser diferente do atual.',
        err: 'Erro ao atualizar o nome de usuário.'
      }

      if (this.newUsername === '') {
        this.usernameMessageClass = 'error-message'
        this.usernameMessage = errors.empty
        return
      }
      if (this.newUsername.length < 3) {
        this.usernameMessageClass = 'error-message'
        this.usernameMessage = errors.minLength
        return
      }
      if (this.newUsername === this.user.username) {
        this.usernameMessageClass = 'error-message'
        this.usernameMessage = errors.sameUsername
        return
      }

      try {
        const res = await axios.put(
          'http://localhost:3000/user/change-username',
          {
            username: this.user.username,
            newUsername: this.newUsername
          },
          {
            withCredentials: true
          }
        )

        if (res.status === 200) {
          this.usernameMessageClass = 'success-message'
          this.usernameMessage = res.data.message
        } else {
          this.usernameMessageClass = 'error-message'
          this.usernameMessage = errors.err
          return
        }
      } catch (error) {
        if (error.response.status === 400) {
          this.usernameMessageClass = 'error-message'
          this.usernameMessage = error.response.data.message
        } else {
          this.usernameMessageClass = 'error-message'
          this.usernameMessage = errors.err
          // console.log(error)
        }
      }
    },
    async updatePassword() {

      const errors = {
        emptyInputs: 'Preencha todos os campos.',
        notMatch: 'As novas senhas inseridas não correspondem.',
        insufficientLength: 'A nova senha deve ter pelo menos 8 caracteres.',
        err: 'Erro ao atualizar a senha.'
      }

      if (
        this.currentPassword === '' ||
        this.newPassword === '' ||
        this.confirmNewPassword === ''
      ) {
        this.passwordMessageClass = 'error-message'
        this.passwordMessage = errors.emptyInputs
        return
      }
      if (this.newPassword.length < 8) {
        this.passwordMessageClass = 'error-message'
        this.passwordMessage = errors.insufficientLength
        return
      }
      if (this.newPassword !== this.confirmNewPassword) {
        this.passwordMessageClass = 'error-message'
        this.passwordMessage = errors.notMatch
        return
      }

      try {
        const res = await axios.put(
          'http://localhost:3000/user/change-password',
          {
            currentPassword: this.currentPassword,
            newPassword: this.newPassword
          },
          {
            withCredentials: true
          }
        )

        if (res.status === 200) {
          this.passwordMessageClass = 'success-message'
          this.passwordMessage = res.data.message
        } else {
          this.passwordMessageClass = 'error-message'
          this.passwordMessage = errors.err
          return
        }
      } catch (error) {
        if (error.response.status === 400) {
          this.passwordMessageClass = 'error-message'
          this.passwordMessage = error.response.data.message
        } else {
          this.passwordMessageClass = 'error-message'
          this.passwordMessage = errors.err
          // console.log(error)
        }
      }
    },
    async handleDeleteAccount() {

      if (this.deleteInput === this.confirmationText) {
        try {
          const res = await axios.delete('http://localhost:3000/user/delete-account', {
            withCredentials: true
          })

          if (res.status === 200) {
            this.dangerConfirmation = false
            this.deleteInput = ''
            this.$router.push({ name: 'home' })
          } else {
            this.deleteMessage = 'Erro ao remover a conta.'
            return
          }
        } catch (error) {
          if (error.response.status === 400) {
            this.deleteMessage = error.response.data.message
            return
          } else {
            this.deleteMessage = 'Erro ao remover a conta.'
            // console.log(error)
            return
          }
        }
      }

      this.deleteInput = ''
      return
    },
    confirmDelete() {
      this.dangerConfirmation = true
    },
    cancelDelete() {
      this.dangerConfirmation = false
      this.deleteInput = ''
    }
  },
  mounted() {
    if (!this.isAuthenticated) {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style scoped>
.settings-page {
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.settings-section {
  margin-bottom: 30px;
}
.settings-section .config-title {
  text-align: center;
  color: #485696;
  margin: 20px auto;
}
.settings-section .danger-title {
  text-align: center;
  color: #fff;
  margin: 20px auto;
}
.settings-section .danger-text {
  text-align: center;
  color: #485696;
  margin: 10px auto;
}
.settings-section p {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  font-weight: bold;
}

.error-message {
  color: #ff4d4d;
}
.success-message {
  color: #b8daff;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: 8px auto;
}

.confirm-btn {
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

.cancel-btn {
  display: flex;
  justify-content: center;
}

.config-zone {
  border-top: 2px solid #f08cae;
  padding-top: 20px;
}

.danger-zone {
  border-top: 2px solid #ff4d4d;
  padding-top: 20px;
}
.danger-zone .delete-btns {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  @media (max-width: 600px) {
    flex-direction: column;
    > .cancel-btn {
      margin-top: 20px;
    }
  }
}
</style>
