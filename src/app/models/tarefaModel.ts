export interface Tarefa {
  id: number;
  titulo: string;
  responsavel: string;
  descricao: string;
  prioridade: 'Baixa' | 'Média' | 'Alta';
  data: string;
  status: 'Pendente' | 'Em andamento' | 'Concluída';
}
