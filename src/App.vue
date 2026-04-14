<script setup>
import { ref, watch } from 'vue';
import Item from './components/Item.vue';
import buttonTask from './components/buttonTask.vue';
import { listaDeTarefas } from './data/tarefas';
import { filtrarTarefas,ordenarTarefas } from './utils/utils';
import { useTarefa } from './composables/useTarefa';
const {
  novoTitulo,
    novosDetalhes,
    novoId,
    filtro,
    concluirTarefa,
    edtTarefa,
    addTarefa,
    delTarefa} = useTarefa();

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
      <buttonTask :tipo="'addTarefa'" :texto="'Adicionar Tarefa'" @clique="addTarefa"></buttonTask>
      <buttonTask :tipo="'addTarefa'" :texto ="'Ordenar Tarefas'" @clique="ordenarTarefas(listaDeTarefas)" ></buttonTask>
    </div>
    <div class="box">
      <ul>
        <li
          v-for="tarefa in filtrarTarefas(listaDeTarefas, filtro)"
          :key="tarefa.id"
        >
        <Item
        :titulo='tarefa.titulo'
         :detalhes='tarefa.detalhes'
         :status='tarefa.status'
         @finalizar="concluirTarefa(tarefa)"
         @deletar="delTarefa(tarefa)"
         @editar="edtTarefa(tarefa)">
        </Item>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>


 div.box h1 {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 5px;
}

 div.box p {
  margin-bottom: 5px;
}

 div input {
  border: none;
  border-radius: 10px;
  background-color: rgb(52, 14, 87);
  color: rgb(255, 255, 255);
  padding: 4px 4px 4px 8px;
  margin-bottom: 5px;
  width: 70%;
}

 ul li {
  display: flex;
  justify-content: space-between;
}
 ul li span {
  font-size: 1rem;
}

</style>
