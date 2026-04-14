import { listaDeTarefas } from '@/data/tarefas'

export function filtrarTarefas(lista, filtro) {
  if (lista.filter((e) => e.titulo.includes(filtro)).length > 0) {
    return lista.filter((e) => e.titulo.includes(filtro))
  } else {
    return lista
  }
}
export function ordenarTarefas() {
  listaDeTarefas.value.sort((a, b) => a.titulo.localeCompare(b.titulo))
}
