<template>
  <div class="char-table">
    <transition name="fade" mode="out-in">
      <Message :msg="msg" tipo="delete" v-show="msg" />
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
          <select name="role" class="role" @change="updatePersonagem($event, char.id)">
            <option value="">Selecionar</option>
            <option
              v-for="role in roles"
              :key="role.id"
              :value="role.tipo"
              :selected="char.role == role.tipo"
            >
              {{ role.tipo }}
            </option>
          </select>
          <button class="delete-btn" @click="deletePersonagem(char.id)">Remover</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from './Message.vue'

export default {
  name: 'Dashboard',
  data() {
    return {
      chars: null,
      char_id: null,
      roles: [],
      msg: null
    }
  },
  methods: {
    async getPersonagens() {
      const req = await fetch('http://localhost:3000/personagens')

      const data = await req.json()

      this.chars = data

      // resgatar os dados

      this.getRole()
    },
    async getRole() {
      const req = await fetch('http://localhost:3000/role')

      const data = await req.json()

      this.roles = data
    },
    async deletePersonagem(id) {
      const req = await fetch(`http://localhost:3000/personagens/${id}`)

      const res = await req.json()

      const name = res.nome

      const del = await fetch(`http://localhost:3000/personagens/${id}`, {
        method: 'DELETE'
      })

      // msg de delete

      this.msg = `O personagem ${name} foi removido com sucesso`

      // limpar msg

      setTimeout(() => (this.msg = ''), 3000)

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
    }
  },
  mounted() {
    this.getPersonagens()
  },
  components: { Message }
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

.delete-btn {
  background-color: #485696;
  color: #f08cae;
  font-weight: bold;
  padding: 6px;
  font-size: 14px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.4s;
}
.delete-btn:hover {
  background-color: #f08cae;
  color: #485696;
}
</style>
