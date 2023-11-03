<template>
  <div class="main-group-container">
    <!-- Exiba os detalhes do grupo -->
    <h2>Detalhes do Grupo {{ group.nome }}</h2>
    <p>Cor: {{ group.cor }}</p>
    <p>Local: {{ group.local }}</p>
    <div class="group-char-name">
      <h3>Personagens do Grupo {{ group.nome }}</h3>
    </div>
    <div>
      <div class="group-char-heading">
        <div>Nome:</div>
        <div>Arma:</div>
        <div>Elemento:</div>
        <div>Ascensão:</div>
      </div>
    </div>
    <div class="group-char-rows">
      <div class="group-char-row" v-for="groupChar in group.personagens" :key="groupChar.uuid">
        <div>{{ groupChar.nome }}</div>
        <div>{{ groupChar.arma }}</div>
        <div>{{ groupChar.elemento }}</div>
        <div>{{ groupChar.ascensao }}</div>
        <div>
          <button 
            class="confirm-btn" 
            @click="abrirModal(groupChar.uuid)"
            >Editar
          </button>
          <button 
          class="cancel-btn" 
          @click="deletePersonagem(groupChar.uuid)"
          >Remover</button>
        </div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <Message :msg="msg" :tipo="msgtipo" v-show="msg" />
    </transition>
    <div class="form-group-container">
      <div>
        <h2>Adicionar novo Personagem para o Grupo</h2>
      </div>
      <form @submit.prevent="addPersonagem">
        <div class="input-group-container">
          <label for="nome">Nome do Personagem</label>
          <input
            type="text"
            id="nome"
            name="nome"
            v-model="formData.nome"
            autocomplete="off"
            placeholder="Digite o nome do personagem"
          />
        </div>
        <div class="input-group-container">
          <label for="arma">Selecione a sua arma:</label>
          <select name="arma" id="arma" v-model="formData.arma">
            <option value="">Selecione a sua arma</option>
            <option v-for="arma in armadata" :key="arma.id">{{ arma.tipo }}</option>
          </select>
        </div>
        <div class="input-group-container">
          <label for="elemento">Selecione o seu elemento:</label>
          <select name="elemento" id="elemento" v-model="formData.elemento">
            <option value="">Selecione o seu elemento</option>
            <option v-for="elemento in elementodata" :key="elemento.id">{{ elemento.tipo }}</option>
          </select>
        </div>
        <div class="input-group-container">
          <label for="ascensao">Escolha a sua ascensão:</label>
          <select name="ascensao" id="ascensao" v-model="formData.ascensao">
            <option value="">Escolha a sua ascensão</option>
            <option v-for="ascensao in ascensaodata" :key="ascensao.id">{{ ascensao.tipo }}</option>
          </select>
        </div>
        <div class="input-group-container">
          <input type="submit" class="confirm-btn" value="Criar Personagem" />
        </div>
      </form>
      <div class="err-msg" :class="{ 'show-err': inputerror }">
        Preencha todos os campos obrigatórios!
      </div>
    </div>
  </div>
  <Modal @madeEdit="getItems(), editShowMsg(msgconfirm, groupId), fecharModal()" :groupCharEdit="groupCharEdit" v-if="mostrarModal" @close="fecharModal"></Modal>
</template>

<script>
import Message from '../components/Message.vue'
import Modal from '../components/Modal.vue'

export default {
  name: 'GroupDetails',
  data() {
    return {
      groupId: null,
      group: null,
      armadata: null,
      elementodata: null,
      localdata: null,
      ascensaodata: null,
      formData: {
        nome: '',
        arma: '',
        elemento: '',
        ascensao: ''
      },
      inputerror: false,
      charEdit: null,
      char_uuid: null,
      mostrarModal: false,
      msg: null,
      msgtipo: "",
      msgconfirm: "confirmation",
      msgdelete: "delete",
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

    fetch(`http://localhost:3000/grupos/${this.groupId}`)
      .then(response => response.json())
      .then(data => {
        this.group = data
      })
  },
  
  // Método para adicionar um novo item ao grupo
  async addPersonagem() {
    const data = {
      nome: this.formData.nome,
      arma: this.formData.arma,
      elemento: this.formData.elemento,
      local: this.group.local,
      ascensao: this.formData.ascensao,
      uuid: this.generateUUID()
    }
    if (!data.nome || !data.arma || !data.elemento || !data.ascensao) {
      return (this.inputerror = true)
    }

    this.group.personagens.push(data);
    const dataJSON = JSON.stringify(this.group);
    const req = await fetch(`http://localhost:3000/grupos/${this.group.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: dataJSON
    });

    const res = await req.json();
    console.log(res);

    // aplicar uma mensagem de sistema
    this.msg = `Seu Personagem ${res.nome} foi criado com sucesso! ^-^`

    // limpar msg
    setTimeout(() => (this.msg = ''), 3000)

    // limpar os campos
    this.formData.nome = ''
    this.formData.arma = ''
    this.formData.elemento = ''
    this.formData.ascensao = ''
    this.inputerror = false
  },
  // Método para excluir um item do grupo
  async deletePersonagem(charId) {

    const thisChar = this.group.personagens.find((personagem) => personagem.uuid === charId);

    this.group.personagens.splice(
      this.group.personagens.findIndex(personagem => personagem.uuid === charId), 
      1);

    const dataJSON = JSON.stringify(this.group);
    const req = await fetch(`http://localhost:3000/grupos/${this.group.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: dataJSON
    });

    const res = await req.json();
    console.log(res);

    // msg de delete
    this.msgtipo = this.msgdelete
    if (thisChar) {
      this.msg = `Personagem ${thisChar.nome} removido com sucesso.`
    } else {
      this.msg = "Personagem removido com sucesso."
    }

    // limpar msg
    setTimeout(() => (this.msg = ''), 3000)
    setTimeout(() => (this.msgtipo = ''), 3600)

    this.getItems()
  },
    async abrirModal(uuid) {

      const thisChar = this.group.personagens.find((personagem) => personagem.uuid === uuid);

      this.groupCharEdit = thisChar
      this.char_uuid = thisChar.uuid

      this.mostrarModal = true;
    },
    fecharModal() {
      this.char_name = null;

      this.mostrarModal = false;
    },
    async editShowMsg(tipo, id) {
      const req = await fetch(`http://localhost:3000/grupos/${id}`)
      const res = await req.json()

      const thisChar = res.personagens.find((personagem) => personagem.uuid === this.char_uuid);

      // aplicar uma mensagem de sistema
      this.msgtipo = tipo
      if(thisChar.nome) {
        this.msg = `Seu Personagem ${thisChar.nome} foi editado com sucesso!`
      } else {
        this.msg = "Seu Personagem foi editado com sucesso!"
      }

      // limpar msg
      setTimeout(() => (this.msg = ''), 3000)
      setTimeout(() => (this.msgtipo = ''), 3600)
    },
  generateUUID() {
    let d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
      d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c==='x' ? r : (r&0x3|0x8)).toString(16);
    });
  }
  },
  mounted() {
    this.getItems()
  },
  created() {
    this.groupId = this.$route.params.id
    
    fetch(`http://localhost:3000/grupos/${this.groupId}`)
      .then(response => response.json())
      .then(data => {
        this.group = data
      })
  },
  components: {
    Message,
    Modal
  }
}
</script>

<style scoped>
/* Estilos específicos do componente */
</style>
  