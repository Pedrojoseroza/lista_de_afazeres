<script setup>
import { ref, watch } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
const novoTitulo = ref('')
const novosDetalhes = ref('')
const posicao = ref(-1)
const antigaLista = JSON.parse(localStorage.getItem('lista')) || [
  {
    id: 1,
    titulo: 'Tarefa 1',
    detalhes: 'Estudar programação',
    status: 'concluida',
  },
  {
    id: 2,
    titulo: 'Tarefa 2',
    detalhes: 'Estudar física',
    status: 'concluida',
  },
  {
    id: 3,
    titulo: 'Tarefa 3',
    detalhes: 'Treinar xadrez',
    status: 'pendente',
  },
  {
    id: 4,
    titulo: 'Tarefa 4',
    detalhes: 'Jogar futsal',
    status: 'pendente',
  },
]
const listaDeTarefas = ref(antigaLista)
const novoId = ref(JSON.parse(localStorage.getItem('id')) || '5')
const quantConcluidas = ref(listaDeTarefas.value.filter((e) => e.status == 'concluida').length)
const quantPendente = ref(listaDeTarefas.value.filter((e) => e.status == 'pendente').length)

// Nunca haverá dois itens como o mesmo id, basicamente, o ID é a tentativa de replicar uma chave primária;
watch(novoId.value, (novoId) => {
  localStorage.setItem('id', JSON.stringify(novoId))
})
watch(listaDeTarefas.value, (novaLista) => {
  localStorage.setItem('lista', JSON.stringify(novaLista))
  quantConcluidas.value = listaDeTarefas.value.filter((e) => e.status == 'concluida').length
  quantPendente.value = listaDeTarefas.value.filter((e) => e.status == 'pendente').length
})
function addTarefa() {
  if (posicao.value == -1) {
    if (novoTitulo.value.trim() !== '' && novosDetalhes.value.trim() !== '') {
      listaDeTarefas.value.push({
        id: novoId,
        titulo: novoTitulo.value,
        detalhes: novosDetalhes.value,
        status: 'pendente',
      })
      novoId.value++
      console.log(
      listaDeTarefas.value[listaDeTarefas.value.length - 1].id);
    } else {
      alert('Não deixe nenhum campo vazio ao tentar adicionar tarefas!')
    }
  } else {
    const itemAEditar = listaDeTarefas.value[posicao.value]
    itemAEditar.titulo = novoTitulo.value
    itemAEditar.detalhes = novosDetalhes.value
  }
  novoTitulo.value = ''
  novosDetalhes.value = ''
}
function delTarefa(item) {
  const index = listaDeTarefas.value.indexOf(item)
  listaDeTarefas.value.splice(index, 1)
}
function edtTarefa(item) {
  const index = listaDeTarefas.value.indexOf(item)
  novoTitulo.value = listaDeTarefas.value[index].titulo
  novosDetalhes.value = listaDeTarefas.value[index].detalhes
  posicao.value = index
}
function concluirTarefa(item) {
  const index = listaDeTarefas.value.indexOf(item)
  if (listaDeTarefas.value[index].status == 'pendente') {
    listaDeTarefas.value[index].status = 'concluida'
  } else {
    listaDeTarefas.value[index].status = 'pendente'
  }
}
const filtro = ref('')
function filtrarTarefas() {
  if (filtro.value.trim().length > 0) {
    return listaDeTarefas.value.filter((e) => e.titulo.includes(filtro.value))
  }
  return listaDeTarefas.value
}
</script>

<template>
  <section class="container">
    <div class="box">
      <h1>Lista de tarefas</h1>
      <p>Insira o novo título e os detalhes de uma nova tarefa (Possui armazenamento local):</p>
      <div>
        <input type="text" v-model="novoTitulo" placeholder="Título" />
        <input type="text" v-model="novosDetalhes" placeholder="Detalhes" />
        <input type="text" v-model="filtro" placeholder="Insira seu filtro aqui" />
        <p>tarefas concluídas: {{ quantConcluidas }} tarefas pendente: {{ quantPendente }}</p>
      </div>
      <br />
      <button @click="addTarefa">Adicionar tarefa</button>
    </div>
    <div class="box">
      <ul>
        <li
          v-for="tarefa in filtrarTarefas()"
          :key="tarefa.id"
          :class="{ concluida: tarefa.status == 'concluida' }"
        >
          <span @click="concluirTarefa(tarefa)">
            {{ tarefa.titulo }}
            <span>
              {{ tarefa.detalhes }}
            </span>
          </span>
          <div class='botoes'>
            <button @click="edtTarefa(tarefa)">
              <font-awesome-icon icon="fa-solid fa-pen-to-square" />
            </button>
            <button @click="delTarefa(tarefa)">
              <font-awesome-icon icon="fa-solid fa-trash" />
            </button>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.container {
  width: 100%;
  min-height: 100vh;
  background-color: pink;
  padding: 30px 0 10px 0;
}

.container div.box {
  margin: 0 30vw 10px 30vw;
  background-color: plum;
  padding: 20px 15px;
  border-radius: 10px;
}

.container div.box h1 {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 5px;
}

.container div.box p {
  margin-bottom: 5px;
}

.container div input {
  border: none;
  border-radius: 10px;
  background-color: rgb(52, 14, 87);
  color: rgb(255, 255, 255);
  padding: 4px 4px 4px 8px;
  margin-bottom: 5px;
  width: 70%;
}

.container ul li {
  display: flex;
  justify-content: space-between;
}
.container ul li span {
  font-size: 1rem;
}
.container ul li span.concluida {
  text-decoration: line-through;
  font-weight: bold;
}
.container ul li span {
  font-weight: bold;
  display: block;
  cursor: pointer;
}
.container ul li span > span {
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.596);
  max-width: 20vw;
  font-weight: normal;
}
.container ul li.concluida span {
  text-decoration: line-through;
}
.container ul li div.botoes button {
  padding: 2px;
  margin-right: 5px;
}
</style>
