import { listaDeTarefas} from '@/data/tarefas'
import { useTarefa } from '@/composables/useTarefa';
import { computed } from 'vue';
const filtro = useTarefa().filtro;
const filtrarTarefas = (lista, filtro) =>  {
  if (lista.filter((e) => e.titulo.includes(filtro)).length > 0) {
    return lista.filter((e) => e.titulo.includes(filtro))
  } else {
    return lista
  }
}
export function ordenarTarefas() {
  listaDeTarefas.value.sort((a, b) => a.titulo.localeCompare(b.titulo))
}
export const tarefasFiltradas = computed(()=> {
  return filtrarTarefas(listaDeTarefas.value, filtro);
})
