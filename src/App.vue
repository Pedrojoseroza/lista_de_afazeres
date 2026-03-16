<script setup>
import { ref, onMounted, watch } from 'vue';
const novoTitulo = ref('');
const novosDetalhes = ref('');
const antigaLista = JSON.parse(localStorage.getItem('lista') || [{id:1, titulo: "Estudar Programação", detalhes:"asdsadasdasd"}]);
const listaDeTarefas = ref(antigaLista);
const novoId = ref(2);
watch(listaDeTarefas.value, () => {
  console.log(localStorage.getItem('lista'));
  localStorage.setItem('lista', JSON.stringify(listaDeTarefas.value));
})
function addTarefa() {
  if (novoTitulo.value.trim() !== '' && novosDetalhes.value.trim()!=="") {
    listaDeTarefas.value.push({id: novoId, titulo: novoTitulo.value, detalhes: novosDetalhes.value});
    novoTitulo.value = "";
    novosDetalhes.value = "";
    novoId.value++;
  } else {
    alert("Não deixe nenhum campo vazio ao tentar adicionar tarefas!");
    novoTitulo.value = "";
    novosDetalhes.value = "";
  }
}
</script>

<template>
<section class="container">
  <div>
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
  <div>
    <ul>
      <li v-for="tarefa in listaDeTarefas" :key="tarefa.id">
        {{ tarefa.titulo }}
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
.container div {
  margin: 0 30vw;
  background-color: plum;
  padding: 20px 15px;
}
.container div h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 5px;
}

.container div p {
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
</style>
