<template>
  <div class="group-table">
    <transition name="fade" mode="out-in">
      <Message :msg="msg" :tipo="msgtipo" v-show="msg" />
    </transition>
    <div>
      <div class="group-table-heading">
        <div>Nome do Grupo:</div>
        <div>Cor:</div>
        <div>Local:</div>
      </div>
    </div>
    <div class="group-table-rows">
      <div class="group-table-row" v-for="group in groups" :key="group.id">
        <div>{{ group.nome }}</div>
        <div>{{ group.arma }}</div>
        <div>{{ group.elemento }}</div>
        <div>{{ group.local }}</div>
        <div>{{ group.ascensao }}</div>
        <div>
          <button class="confirm-btn" @click="teste()">Editar</button>
          <button class="cancel-btn" @click="deleteGrupo(group.id)">Remover</button>
        </div>
      </div>
    </div>
  </div>
  <Modal @madeEdit="getPersonagens(), editShowMsg(msgconfirm, group_id), fecharModal()" :charEdit="charEdit" v-if="mostrarModal" @close="fecharModal"></Modal>
</template>

<script>
import Message from './Message.vue'
import Modal from './Modal.vue'

export default {
  name: 'Dashboard',
  data() {
    return {
      groups: null,
      group_id: null,
      roles: [],
      charEdit: null,
      mostrarModal: false,
      msg: null,
      msgtipo: "",
      msgconfirm: "confirmation",
      msgdelete: "delete",
    }
  },
  methods: {
    async getGrupos() {
      const req = await fetch('http://localhost:3000/grupos')

      const data = await req.json()

      this.groups = data
    },
    async deleteGrupo(id) {
      const req = await fetch(`http://localhost:3000/grupos/${id}`)

      const res = await req.json()

      const name = res.nome

      const del = await fetch(`http://localhost:3000/grupos/${id}`, {
        method: 'DELETE'
      })

      // msg de delete

      this.msgtipo = this.msgdelete
      this.msg = `O grupo ${name} foi removido com sucesso`

      // limpar msg

      setTimeout(() => (this.msg = ''), 3000)
      setTimeout(() => (this.msgtipo = ''), 3600)

      this.getGrupos()
    },
    // async updatePersonagem(e, id) {
    //   const option = e.target.value

    //   const dataJSON = JSON.stringify({ role: option })

    //   const req = await fetch(`http://localhost:3000/personagens/${id}`, {
    //     method: 'PATCH',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: dataJSON
    //   })

    //   const res = await req.json()

    //   console.log(res)
    // },
    // async abrirModal(id) {
    //   const req = await fetch(`http://localhost:3000/personagens/${id}`)

    //   const res = await req.json()

    //   this.charEdit = res
    //   this.char_id = res.id

    //   this.mostrarModal = true;
    // },
    // fecharModal() {
    //   this.char_name = null;

    //   this.mostrarModal = false;
    // },
    async teste() {
      console.log("Testando...")
    },
    async editShowMsg(tipo, id) {
      const req = await fetch(`http://localhost:3000/personagens/${id}`)

      const res = await req.json()

      console.log(res)

      // aplicar uma mensagem de sistema
      this.msgtipo = tipo
      if(res.nome) {
        this.msg = `Seu Personagem ${res.nome} foi editado com sucesso!`
      } else {
        this.msg = "Seu Personagem foi editado com sucesso!"
      }

      // limpar msg
      setTimeout(() => (this.msg = ''), 3000)
      setTimeout(() => (this.msgtipo = ''), 3600)
    }
  },
  mounted() {
    this.getGrupos()
  },
  components: { Message, Modal }
}
</script>

<style scoped>
.group-table {
  max-width: 1200px;
  margin: 0 auto;
}

.group-table-heading,
.group-table-rows,
.group-table-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.group-table-heading {
  font-weight: bold;
  padding: 12px;
  border-bottom: 3px solid #f08cae;
}

.group-table-heading div {
  color: #f08cae;
}

.group-table-row div {
  color: #485696;
}

.group-table-heading div,
.group-table-row div {
  width: 16%;
  /* width: 13%; */
}

.group-table-rows,
.group-table-row,
.group-table-row div {
  background-color: #222;
}

.group-table-row {
  width: 100%;
  padding: 12px;
  border-bottom: 1px solid #ccc;
}

select {
  padding: 7px 4px;
  margin-right: 12px;
  background-color: #333;
  color: #fff;
}
.confirm-btn {
  padding: 6px;
  font-size: 14px;
  margin-right: 10px;
}
</style>
