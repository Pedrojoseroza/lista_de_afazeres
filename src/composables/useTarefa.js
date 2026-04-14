import { ref, watch } from 'vue'
import { listaDeTarefas } from '@/data/tarefas'

function useTarefa() {
  const novoTitulo = ref('')
  const novosDetalhes = ref('')
  const posicao = ref(-1)
  const novoId = ref(JSON.parse(localStorage.getItem('id')) || '5')
  const filtro = ref('')
  const quantConcluidas = ref( listaDeTarefas.value.filter((e) => e.status == 'concluida').length);
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
      } else {
        alert('Não deixe nenhum campo vazio ao tentar adicionar tarefas!')
      }
    } else {
      const itemAEditar = listaDeTarefas.value[posicao.value]
      itemAEditar.titulo = novoTitulo.value
      itemAEditar.detalhes = novosDetalhes.value
      posicao.value = -1
    }
    novoTitulo.value = ''
    novosDetalhes.value = ''
  }
  function delTarefa(item) {
    const index = listaDeTarefas.value.indexOf(item)
    listaDeTarefas.value.splice(index, 1);
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
  return {
    novoTitulo,
    novosDetalhes,
    novoId,
    filtro,
    concluirTarefa,
    edtTarefa,
    addTarefa,
    delTarefa,
    quantConcluidas,
    quantPendente
  }
}
export { useTarefa }
