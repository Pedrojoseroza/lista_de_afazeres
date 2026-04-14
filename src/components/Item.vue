<script setup>
import buttonTask from './buttonTask.vue';
defineProps(['titulo', 'detalhes', 'status']);
defineEmits(['finalizar', 'deletar', 'editar']);
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>
<template>
    <div class="item">
      <span @click="$emit('finalizar')" :class='status' >
        {{ titulo }}
        <span>
          {{ detalhes }}
        </span>
      </span>
      <div class="botoes">
          <buttonTask  :tipo="'editar'" @clique="$emit('editar')">
            <font-awesome-icon icon="fa-solid fa-pen-to-square" />
          </buttonTask>
          <buttonTask  :tipo="'deletar'" @clique="$emit('deletar')">
            <font-awesome-icon icon="fa-solid fa-trash" />           
        </buttonTask>
      </div>
    </div>
</template>
<style scoped>
div.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
 span.concluida {
  text-decoration: line-through;
  font-weight: bold;
}
 span {
  font-weight: bold;
  display: block;
  cursor: pointer;
}
 span > span {
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.596);
  max-width: 20vw;
  font-weight: normal;
}
.concluida span {
  text-decoration: line-through;
}
.botoes {
  display: flex;
  align-items: center;
}
</style>
