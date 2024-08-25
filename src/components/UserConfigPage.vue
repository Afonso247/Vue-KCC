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
        <button type="submit" class="confirm-btn" style="text-align: center;">Salvar Nome de Usuário</button>
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
      </form>
    </section>

    <section class="settings-section danger-zone">
      <h2 class="danger-title">Zona de Perigo</h2>
      <button @click="confirmDeleteAccount" class="cancel-btn">Remover Conta</button>
    </section>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'UserConfigPage',
  data() {
    return {
      newUsername: '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  },
  methods: {
    // async updateUsername() {
    //   if (this.newUsername === '') {
    //     alert('Por favor, insira o novo nome de usuário.')
    //     return
    //   } else if (this.newUsername.length < 3) {
    //     alert('O nome de usuário deve ter pelo menos 3 caracteres.')
    //     return
    //   }
    //   try {
    //     const res = await axios.put('http://localhost:3000/api/user', {
    //       username: this.newUsername
    //     })

    //     if (res.status === 200) {
    //       console.log('Nome de usuário atualizado para:', this.newUsername)
    //     }
    //   } catch (error) {
    //     if (error.response.status === 400) {
    //       alert(error.response.data.message)
    //     } else {
    //       alert('Erro ao atualizar o nome de usuário')
    //       console.log(error)
    //     }
    //   }

    //   // console.log('Nome de usuário atualizado para:', this.newUsername)
    // },
    updatePassword() {
      if (this.newPassword !== this.confirmNewPassword) {
        alert('As senhas inseridas não correspondem. Por favor, tente novamente.')
        return
      }
      // Lógica para atualizar a senha
      console.log('Senha atualizada para:', this.newPassword)
    },
    confirmDeleteAccount() {
      if (confirm('Tem certeza de que deseja remover sua conta? Essa ação não pode ser desfeita.')) {
        // Lógica para remover a conta
        console.log('Conta removida')
      }
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
  margin: 8px auto;
}

.confirm-btn {
  display: flex;
  justify-content: center;
}

.cancel-btn {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.config-zone {
  border-top: 2px solid #f08cae;
  padding-top: 20px;
}

.danger-zone {
  border-top: 2px solid #ff4d4d;
  padding-top: 20px;
}
</style>
