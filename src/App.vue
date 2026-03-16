<script setup>
import { ref, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const novoTitulo = ref('');
const novosDetalhes = ref('');
const posicao = ref(-1);
const antigaLista = JSON.parse(localStorage.getItem('lista')) || [
{
id: 1,
titulo: 'Tarefa 1',
detalhes: 'Estudar programação',
status: 'concluida'
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
status: 'pendente'
},
{
id: 4,
titulo: 'Tarefa 4',
detalhes: 'Jogar futsal',
status: 'pendente'
}];
const listaDeTarefas = ref(antigaLista);
const novoId = ref(2);
watch(listaDeTarefas.value, (novaLista) => {
  console.log(localStorage.getItem('lista'));
  localStorage.setItem('lista', JSON.stringify(novaLista));
})
function addTarefa() {
if (posicao.value == -1) {
  if (novoTitulo.value.trim() !== '' && novosDetalhes.value.trim() !== "") {
    listaDeTarefas.value.push({
      id: novoId, titulo: novoTitulo.value,
      detalhes: novosDetalhes.value,
      status: 'pendente'
    });
    novoId.value++;
  } else {
    alert("Não deixe nenhum campo vazio ao tentar adicionar tarefas!");
  } 
} else {
  const itemAEditar = listaDeTarefas.value[posicao.value];
  console.log(itemAEditar);
  itemAEditar.titulo = novoTitulo.value;
  itemAEditar.detalhes = novosDetalhes.value;
}
  novoTitulo.value = "";
  novosDetalhes.value = "";

}
function delTarefa(id) {
  const index = listaDeTarefas.value.findIndex(e => e.id == id);
  listaDeTarefas.value.splice(index, 1);
  console.log('Tá entrando' + listaDeTarefas.value[index]);
};
function edtTarefa(id) {
  const index = listaDeTarefas.value.findIndex(e => e.id == id);
  novoTitulo.value = listaDeTarefas.value[index].titulo;
  novosDetalhes.value = listaDeTarefas.value[index].detalhes;
  posicao.value = index;
}
function concluirTarefa(id) {
  const index = listaDeTarefas.value.findIndex(e => e.id == id);
  if (
  listaDeTarefas.value[index].status == 'pendente') {
    listaDeTarefas.value[index].status = 'concluida';
  } else {
    listaDeTarefas.value[index].status = 'pendente';
  }
}
</script>

<template>
  <section class="container">
    <div class="box">
      <h1>
        Lista de tarefas
      </h1>
      <p>
        Insira o novo título e os detalhes de uma nova tarefa:
      </p>
      <input type="text" v-model="novoTitulo" placeholder="título">
      <input type="text" v-model="novosDetalhes" placeholder="detalhes">
      <br>
      <button @click="addTarefa">Adicionar tarefa</button>
    </div>
    <div class="box">
      <ul>
        <li v-for="tarefa in listaDeTarefas" :key="tarefa.id" :class="{concluida: tarefa.status == 'concluida'}">
          <span @click="concluirTarefa(tarefa.id)">
            {{ tarefa.titulo }}
            <span>
              {{ tarefa.detalhes }}
            </span>
          </span>
          <div>
            <button @click="edtTarefa(tarefa.id)" ><font-awesome-icon icon="fa-solid fa-pen-to-square"/></button>
            <button @click="delTarefa(tarefa.id)"> <font-awesome-icon icon="fa-solid fa-trash"/> </button>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  background-color: pink;
  padding: 30px 0 0 0;
}

.container div.box {
  margin: 0 30vw 10px 30vw;
  background-color: plum;
  padding: 20px 15px;
  border-radius: 10px;
}

.container div.box h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 5px;
}

.container div.box p {
  margin-bottom: 5px;
}

.container input {
  border: none;
  border-radius: 10px;
  background-color: rgb(52, 14, 87);
  color: rgb(255, 255, 255);
  padding: 4px;
  margin-bottom: 5px
}

.container ul li {
  display: flex;
  justify-content: space-between;
}
.container ul li span.concluida {
  text-decoration: line-through;
  font-weight: bold;
}
.container ul li span {
  display: block;
}
.container ul li span > span {
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.596);
  max-width: 20vw;
}
.container ul li.concluida span {
  text-decoration: line-through;
}
</style>
