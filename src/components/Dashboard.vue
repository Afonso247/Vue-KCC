<template>
  <div class="char-table">
    <transition name="fade" mode="out-in">
      <Message :msg="msg" :tipo="msgtipo" v-show="msg" />
    </transition>
    <div>
      <div class="char-table-heading">
        <div>Personagem:</div>
        <div>Arma:</div>
        <div>Elemento:</div>
        <div>Local:</div>
        <div>Ascensão:</div>
        <div>Papel:</div>
      </div>
    </div>
    <div class="char-table-rows">
      <div class="char-table-row" v-for="char in chars" :key="char.id">
        <div>{{ char.nome }}</div>
        <div>{{ char.arma }}</div>
        <div>{{ char.elemento }}</div>
        <div>{{ char.local }}</div>
        <div>{{ char.ascensao }}</div>
        <div>
          <button class="confirm-btn" @click="abrirModal(char.id)">Editar</button>
          <button class="cancel-btn" @click="deletePersonagem(char.id)">Remover</button>
        </div>
      </div>
    </div>
  </div>
  <Modal @madeEdit="getPersonagens(), editShowMsg(msgconfirm, char_id), fecharModal()" :charEdit="charEdit" v-if="mostrarModal" @close="fecharModal"></Modal>
</template>

<script>
import Message from './Message.vue'
import Modal from './Modal.vue'

export default {
  name: 'Dashboard',
  data() {
    return {
      chars: null,
      char_id: null,
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
    async getPersonagens() {
      const req = await fetch('http://localhost:3000/personagens')

      const data = await req.json()

      this.chars = data
    },
    async deletePersonagem(id) {
      const req = await fetch(`http://localhost:3000/personagens/${id}`)

      const res = await req.json()

      const name = res.nome

      const del = await fetch(`http://localhost:3000/personagens/${id}`, {
        method: 'DELETE'
      })

      // msg de delete

      this.msgtipo = this.msgdelete
      this.msg = `Seu personagem ${name} foi removido com sucesso`

      // limpar msg

      setTimeout(() => (this.msg = ''), 3000)
      setTimeout(() => (this.msgtipo = ''), 3600)

      this.getPersonagens()
    },
    async updatePersonagem(e, id) {
      const option = e.target.value

      const dataJSON = JSON.stringify({ role: option })

      const req = await fetch(`http://localhost:3000/personagens/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: dataJSON
      })

      const res = await req.json()

      console.log(res)
    },
    async abrirModal(id) {
      const req = await fetch(`http://localhost:3000/personagens/${id}`)

      const res = await req.json()

      this.charEdit = res
      this.char_id = res.id

      this.mostrarModal = true;
    },
    fecharModal() {
      this.char_name = null;

      this.mostrarModal = false;
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
    this.getPersonagens()
  },
  components: { Message, Modal }
}
</script>

<style scoped>
.char-table {
  max-width: 1200px;
  margin: 0 auto;
}

.char-table-heading,
.char-table-rows,
.char-table-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.char-table-heading {
  font-weight: bold;
  padding: 12px;
  border-bottom: 3px solid #f08cae;
}

.char-table-heading div {
  color: #f08cae;
}

.char-table-row div {
  color: #485696;
}

.char-table-heading div,
.char-table-row div {
  width: 16%;
  /* width: 13%; */
}

.char-table-rows,
.char-table-row,
.char-table-row div {
  background-color: #222;
}

.char-table-row {
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
