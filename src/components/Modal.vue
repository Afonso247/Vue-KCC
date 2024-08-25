<template>
  <div class="modal">
    <div class="modal-content">
      <div class="form-container">
        <h3 class="editTitle">Editar "{{ groupCharEdit.nome }}"</h3>
        <form @submit.prevent="editarPersonagem">
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
              <option v-for="elemento in elementodata" :key="elemento.id">
                {{ elemento.tipo }}
              </option>
            </select>
          </div>
          <div class="input-container">
            <label for="ascensao">Escolha a sua ascensão:</label>
            <select name="ascensao" id="ascensao" v-model="ascensao">
              <option value="">Escolha a sua ascensão</option>
              <option v-for="ascensao in ascensaodata" :key="ascensao.id">
                {{ ascensao.tipo }}
              </option>
            </select>
          </div>
          <div class="input-container">
            <input type="submit" class="confirm-btn" value="Editar Personagem" />
          </div>
        </form>
        <div class="err-msg" :class="{ 'show-err': inputerror }">
          Preencha todos os campos obrigatórios!
        </div>
        <button class="cancel-btn" @click="$emit('close')">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    groupCharEdit: Object
  },
  data() {
    return {
      groupChar: null,
      armadata: null,
      elementodata: null,
      ascensaodata: null,
      nome: null,
      arma: null,
      elemento: null,
      local: null,
      ascensao: null,
      uuid: null,
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
      if (this.groupChar.role != 'Main DPS' && this.groupChar.role != 'Sub DPS') {
        this.ascensaodata = data.ascensao.slice(0, -3)
      } else {
        this.ascensaodata = data.ascensao
      }
    },
    async editarPersonagem() {
      const data = {
        nome: this.nome,
        arma: this.arma,
        elemento: this.elemento,
        local: this.local,
        ascensao: this.ascensao,
        uuid: this.uuid
      }
      if (!data.nome || !data.arma || !data.elemento || !data.ascensao) {
        return (this.inputerror = true)
      }

      // Procurando um objeto no array this.group com o mesmo uuid que o de data
      const index = this.groupChar.personagens.findIndex(
        (personagem) => personagem.uuid === data.uuid
      )

      // Se o objeto for encontrado, atualize os valores para serem iguais aos de data
      if (index !== -1) {
        this.groupChar.personagens[index].nome = data.nome
        this.groupChar.personagens[index].arma = data.arma
        this.groupChar.personagens[index].elemento = data.elemento
        this.groupChar.personagens[index].local = data.local
        this.groupChar.personagens[index].ascensao = data.ascensao
      }

      const dataJSON = JSON.stringify(this.groupChar)
      const req = await fetch(`http://localhost:3000/grupos/${this.groupChar.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: dataJSON
      })

      const res = await req.json()
      console.log(res)

      // console.log(data)
      this.$emit('madeEdit', data)
    }
  },
  mounted() {
    if (this.groupCharEdit) {
      this.getItems()

      this.nome = this.groupCharEdit.nome
      this.arma = this.groupCharEdit.arma
      this.elemento = this.groupCharEdit.elemento
      this.local = this.groupCharEdit.local
      ;(this.ascensao = this.groupCharEdit.ascensao), (this.uuid = this.groupCharEdit.uuid)
    }
  },
  created() {
    const groupId = this.$route.params.id

    fetch(`http://localhost:3000/grupos/${groupId}`)
      .then((response) => response.json())
      .then((data) => {
        this.groupChar = data
      })
  }
}
</script>

<style scoped>
/* Estilos para o modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f08cae;
}

.modal-content {
  border: 2px solid #222;
  border-radius: 10px;
  background-color: #111;
  color: #f08cae;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}
.editTitle {
  color: #485696;
  border-bottom: 2px solid #f08cae;
}
.cancel-btn {
  padding: 8px;
  font-size: 16px;
  width: 100%;
  color: #f08cae;
  background-color: #485696;
}
.input-container {
  color: #f08cae;
}

select,
input[type='text'] {
  padding: 5px 10px;
  width: 400px;
  color: #f08cae;
}
</style>
