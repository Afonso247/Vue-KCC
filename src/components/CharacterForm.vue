<template>
  <transition name="fade" mode="out-in">
    <Message :msg="msg" tipo="confirmation" v-show="msg" />
  </transition>
  
  <div class="form-container">
    <form @submit.prevent="criarGrupo">
      
      <div class="input-container">
        <label for="nome">Nome do Grupo</label>
        <input
          type="text"
          id="nome"
          name="nome"
          v-model="nome"
          autocomplete="off"
          placeholder="Digite o nome do grupo"
        />
      </div>
      <div class="input-container">
        <label for="role">Selecione o papel:</label>
        <select class = "hover"  name="role" id="role" v-model="role">
          <option value="">Selecione o papel</option>
          <option v-for="role in roledata" :key="role.id">{{ role.tipo }}</option>
        </select>
      </div>
      <div class="input-container">
        <label for="local">Escolha a localização:</label>
        <select class = "hover" name="local" id="local" v-model="local">
          <option value="">Escolha a sua localização</option>
          <option v-for="local in localdata" :key="local.id">{{ local.tipo }}</option>
        </select>
      </div>
      <div class="input-container">
        <input type="submit" class="confirm-btn" value="Criar Grupo" />
      </div>
    </form>
    <div class="err-msg" :class="{ 'show-err': inputerror }">
      Preencha todos os campos obrigatórios!
    </div>
  </div>
</template>

<script>
import Message from './Message.vue'

export default {
  name: 'CharacterForm',
  data() {
    return {
      roledata: null,
      localdata: null,
      nome: null,
      role: null,
      local: null,
      inputerror: false,
      msg: null
    }
  },
  methods: {
    async getItems() {
      const req = await fetch('http://localhost:3000/tipagem')
      const data = await req.json()
      this.roledata = data.role
      this.localdata = data.local
    },
    async criarGrupo() {
      const data = {
        nome: this.nome,
        role: this.role,
        local: this.local,
        personagens: []
      }
      if (!data.nome || !data.role || !data.local) {
        return (this.inputerror = true)
      }
      const dataJSON = JSON.stringify(data)
      const req = await fetch('http://localhost:3000/grupos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: dataJSON
      })
      const res = await req.json()
      console.log(res)

      // aplicar uma mensagem de sistema
      this.msg = `Seu Grupo ${res.nome} foi criado com sucesso!`

      // limpar msg
      setTimeout(() => (this.msg = ''), 3000)

      // limpar os campos
      this.nome = ''
      this.local = ''
      this.inputerror = false
    }
  },
  mounted() {
    this.getItems()
  },
  components: {
    Message
  }
}
</script>

<style scoped>
* {
  background-color: #111;
}
.form-container {
  border: 3px solid #333333;
  border-radius: 10px;
  max-width: 500px;
  margin: 0 auto;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
.form-container span {
  color: #fff;
  margin-top: auto;
}
.input-container {
  display: flex;
  flex-direction: column;
  margin: 20px auto;
}

label {
  font-weight: bold;
  margin-bottom: 15px;
  color: #485696;
  padding: 5px 10px;
  border-left: 4px solid #f08cae;
}
input,
select {
  background-color: #333;
  padding: 5px 10px;
  width: 400px;
  color: #f08cae;
  
}
select {
  cursor: pointer;
}
.confirm-btn {
  background-color: #485696;
  font-weight: bold;
  color: #f08cae;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.4s;
}
.err-msg {
  text-align: center;
  color: transparent; /* Inicialmente, torna o texto transparente */
  transition: color 0.3s ease-in-out; /* Adiciona uma transição suave de cor */
}
.show-err {
  color: red; /* Define a cor desejada quando a mensagem é exibida */
}
.confirm-btn:hover {
  background-color: #f08cae;
  color: #485696;
}

@media screen and (max-width: 768px) {
  .form-container {
    max-width: 400px;
  }
  input,
  select {
    width: 300px;
  }
}
@media screen and (max-width: 480px) {
  .form-container {
    max-width: 300px;
  }
  input,
  select {
    width: 220px;
  }
}
.hover{
color: #f08cae;
}
</style>
