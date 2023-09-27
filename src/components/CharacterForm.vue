<template>
  <transition name="fade" mode="out-in">
    <Message :msg="msg" tipo="confirmation" v-show="msg" />
  </transition>
  <div class="form-container">
    <form @submit.prevent="criarPersonagem">
      <div class="input-container">
        <label for="nome">Nome do Personagem</label>
        <input
          type="text"
          id="nome"
          name="nome"
          v-model="nome"
          autocomplete="off"
          placeholder="Digite o nome do personagem"
        />
      </div>
      <div class="input-container">
        <label for="arma">Selecione a sua arma:</label>
        <select name="arma" id="arma" v-model="arma">
          <option value="">Selecione a sua arma</option>
          <option v-for="arma in armadata" :key="arma.id">{{ arma.tipo }}</option>
        </select>
      </div>
      <div class="input-container">
        <label for="elemento">Selecione o seu elemento:</label>
        <select name="elemento" id="elemento" v-model="elemento">
          <option value="">Selecione o seu elemento</option>
          <option v-for="elemento in elementodata" :key="elemento.id">{{ elemento.tipo }}</option>
        </select>
      </div>
      <div class="input-container">
        <label for="local">Escolha a sua localização:</label>
        <select name="local" id="local" v-model="local">
          <option value="">Escolha a sua localização</option>
          <option v-for="local in localdata" :key="local.id">{{ local.tipo }}</option>
        </select>
      </div>
      <div class="input-container">
        <label for="ascensao">Escolha a sua ascensão:</label>
        <select name="ascensao" id="ascensao" v-model="ascensao">
          <option value="">Escolha a sua ascensão</option>
          <option v-for="ascensao in ascensaodata" :key="ascensao.id">{{ ascensao.tipo }}</option>
        </select>
      </div>
      <div class="input-container">
        <input type="submit" class="confirm-btn" value="Criar Personagem" />
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
      armadata: null,
      elementodata: null,
      localdata: null,
      ascensaodata: null,
      nome: null,
      arma: null,
      elemento: null,
      local: null,
      ascensao: null,
      inputerror: false,
      msg: null
    }
  },
  methods: {
    async getItems() {
      const req = await fetch('http://localhost:3000/tipos')
      const data = await req.json()
      this.armadata = data.arma
      this.elementodata = data.elemento
      this.localdata = data.local
      this.ascensaodata = data.ascensao
    },
    async criarPersonagem() {
      const data = {
        nome: this.nome,
        arma: this.arma,
        elemento: this.elemento,
        local: this.local,
        ascensao: this.ascensao,
        role: 'Selecionar'
      }
      if (!data.nome || !data.arma || !data.elemento || !data.local || !data.ascensao) {
        return (this.inputerror = true)
      }
      const dataJSON = JSON.stringify(data)
      const req = await fetch('http://localhost:3000/personagens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: dataJSON
      })
      const res = await req.json()
      console.log(res)

      // aplicar uma mensagem de sistema
      this.msg = `Seu Personagem ${res.nome} foi criado com sucesso! ^-^`

      // limpar msg
      setTimeout(() => (this.msg = ''), 3000)

      // limpar os campos
      this.nome = ''
      this.arma = ''
      this.elemento = ''
      this.local = ''
      this.ascensao = ''
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
  background-color: #222222;
}
.form-container {
  border: 2px solid #333333;
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
  color: #fff;
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
</style>
