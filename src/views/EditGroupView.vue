<template>
    <div>
      <!-- Exiba os detalhes do grupo -->
      <h2>Detalhes do Grupo {{ group.nome }}</h2>
      <p>Cor: {{ group.cor }}</p>
      <p>Local: {{ group.local }}</p>
      <div>
        <h3>Personagens do Grupo {{ group.nome }}</h3>
      </div>
      <div v-for="groupChar in group.personagens" :key="groupChar.uuid">
        <div>{{ groupChar.nome }}</div>
        <div>{{ groupChar.tipo }}</div>
        <div>
          <button>Editar</button>
          <button>Remover</button>
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <Message :msg="msg" tipo="confirmation" v-show="msg" />
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
  </template>
  
  <script>
  import Message from '../components/Message.vue'

  export default {
    name: 'GroupDetails',
    data() {
      return {
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

    // Método para modificar um item existente no grupo
    modificarItem(item) {
      // Implemente a lógica para modificar um item existente no grupo
      // Use this.formData para acessar os dados do formulário
      // Atualize this.group com os dados modificados
      // Faça uma solicitação ao servidor para atualizar os dados, se necessário
    },
    // Método para excluir um item do grupo
    excluirItem(item) {
      // Implemente a lógica para excluir um item do grupo
      // Atualize this.group removendo o item da lista
      // Faça uma solicitação ao servidor para excluir o item, se necessário
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
      const groupId = this.$route.params.id
      
      fetch(`http://localhost:3000/grupos/${groupId}`)
        .then(response => response.json())
        .then(data => {
          this.group = data
        })
    },
    components: {
      Message
    }
  }
  </script>
  
  <style scoped>
  /* Estilos específicos do componente */
  </style>
  