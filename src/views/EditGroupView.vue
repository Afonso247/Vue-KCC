<template >
  <div class="main-group-container">
    <!-- Exiba os detalhes do grupo -->
    <br><br>
    <div class="main-group-details">
      <h2 class="group-title">Detalhes do Grupo {{ group.nome }}</h2><br>
      <p>Papel: {{ group.role }}</p>
      <p>Local: {{ group.local }}</p>
    </div>
    <div>
      <h2 class="group-title">Personagens do Grupo {{ group.nome }}</h2><br>
    </div>
    <table class="group-char-table">
        
          <thead>
            <tr>
              <th>Nome</th>
              <th>Arma</th>
              <th>Elemento</th>
              <th>Ascensão</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="groupChar in group.personagens" :key="groupChar.uuid">

              <td>{{ groupChar.nome }}</td>
              <td>{{ groupChar.arma }}</td>
              <td>{{ groupChar.elemento }}</td>
              <td>{{ groupChar.ascensao }}</td>
              <td class="botoes">
                <button class="confirm-btn" @click="abrirModal(groupChar.uuid)">Editar</button>
                <button class="cancel-btn" @click="deletePersonagem(groupChar.uuid)">Apagar</button>
              </td>

                
            </tr>
          </tbody>
        
    </table>

    <hr>

    <transition name="fade" mode="out-in">
      <Message :msg="msg" :tipo="msgtipo" v-show="msg" />
    </transition>
    <div class="form-group-container">
      <div class="texto1">
        <h2>Adicionar Novo Personagem Para o Grupo</h2>
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
        <br>
        <div class="input-group-container">
          <input type="submit" class="confirm-btn" value="Criar Personagem" />
        </div>
      </form>
      <br><br><br>
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
    fetch(`http://localhost:3000/grupos/${this.groupId}`)
      .then(response => response.json())
      .then(data => {
        this.group = data
        console.log(this.group)
      })

    const req = await fetch('http://localhost:3000/tipos')
    const data = await req.json()
    this.armadata = data.arma
    this.elementodata = data.elemento
    this.localdata = data.local
    if(this.group.role != 'Main DPS' && this.group.role != 'Sub DPS') {
      this.ascensaodata = data.ascensao.slice(0, -3)
    } else {
      this.ascensaodata = data.ascensao
    }
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
    this.msg = `Seu Personagem ${data.nome} foi criado com sucesso! ^-^`
    this.msgtipo = this.msgconfirm

    // limpar msg
    setTimeout(() => (this.msg = ''), 3000)
    setTimeout(() => (this.msgtipo = ''), 3600)

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
    
    this.getItems()
  },
  components: {
    Message,
    Modal
  }
}
</script>

<style scoped>
.main-group-container {
  max-width: 1200px;
  margin:auto;
}

.main-group-details {
  text-align: center;
  margin-bottom: 30px;
}

.group-title {
  color: #485696;
  display: flex;
  justify-items: center;
  justify-content: center;
  align-items: center;
}

hr {
    border: 0;
    height: 3px;
    background-color: #f08cae;
    margin-top: 20px;
    margin-bottom: 30px;
}

.confirm-btn {
  padding: 6px;
  font-size: 14px;
  margin-right: 10px;
}

.cancel-btn {
  color: #f08cae;
  background-color: #485696;
}

.form-group-container {
  max-width: 500px;
  margin: 25px auto;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

}

.input-group-container {
  margin-top: 10px;
}

label {
  color: #485696;
  display: flex;
  align-items: center;
}

select,
input[type="text"] {
  padding: 7px 4px;
  margin-right: 12px;
  background-color: #222;
  color: #f08cae;
}

.confirm-btn {
  padding: 6px;
  font-size: 14px;
  margin-right: 10px;
}
.cancel-btn{
  color:#f08cae ;
  background-color:#485696 ;
}

.err-msg {
  color: red;
  margin-top: 10px;
  display: none;
}

.show-err {
  display: block;
}

.bt1 {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

p {
color: #f08cae;

}

.texto1 {
color: #485696;

}



.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #f08cae;
}





.group-char-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #111;
  border-radius: 10px; 
}
.group-char-table th{
  font-weight: bold;
  padding: 12px;
  text-align: center;
  color: #f08cae;
  border-bottom: 3px solid #f08cae;
 

} .group-char-table td {
  padding: 8px;
  text-align: center;
  color: #485696;
  border-bottom: 2px solid #485696;

  
}

.group-char-table th {
  background-color: #111;
  
}

.group-char-table tr:hover {
  background-color: #111;
}

.group-char-table td:last-child {
  text-align: center;
}


.group-char-table{
  color: aquamarine;
}
.arredondar{
  width: 100%;
  border-collapse: collapse;
  background-color: #111;
  border-radius: 10px; 
}
</style>
  

