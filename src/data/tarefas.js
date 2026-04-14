import { ref } from 'vue'
const tarefas = JSON.parse(localStorage.getItem('lista')) || [
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
const antigaLista = tarefas
const listaDeTarefas = ref(antigaLista)
export { listaDeTarefas }
