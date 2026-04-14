<script setup>
defineProps(['tipo', 'texto'])

defineEmits(['clique'])
</script>
<template>
  <div>
    <button @click="$emit('clique')" :class="tipo">
      {{ texto }}
      <slot></slot>
    </button>
  </div>
</template>
<style scoped>
button.addTarefa {
  margin: 0 30%;
  text-align: center;
  background-color: rgb(52, 14, 87);
  color: rgb(255, 255, 255);
}
button.botoes {
  padding: 2px;
  margin-right: 5px;
}

button.editar {
  background-color: rgb(86, 238, 86);
}
button.deletar {
  background-color: rgb(241, 61, 61);
}
</style>
