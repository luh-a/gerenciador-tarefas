import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskCardsComponent } from '../task-cards-component/task-cards-component';
import { Tarefa } from '../../models/tarefaModel';

@Component({
  imports: [CommonModule, FormsModule, TaskCardsComponent],
  selector: 'app-lista-tarefas',
  styleUrl: './lista-tarefas.css',
  templateUrl: './lista-tarefas.html',
})
export class ListaTarefas {
  titulo: string = '';
  responsavel: string = '';
  descricao: string = '';
  prioridade: 'Baixa' | 'Média' | 'Alta' = 'Baixa';
  data: string = '';

  listaTarefas: Tarefa[] = [];

  adicionarTarefa() {
    if(!this.titulo || !this.responsavel || !this.descricao || !this.data) return;

    let dataFormatada = this.data;
    if(this.data.includes('-')) {
      const partes = this.data.split('-');
      dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;
    }

    const novaTarefa: Tarefa = {
      id: Date.now(),
      titulo: this.titulo,
      responsavel: this.responsavel,
      descricao: this.descricao,
      prioridade: this.prioridade,
      data: dataFormatada,
      status: 'Pendente',
    };

    this.listaTarefas.push(novaTarefa);
    this.limparFormulario();
  }

  atualizarStatus(evento: { id: number; status: 'Pendente' | 'Em andamento' | 'Concluída' }) {
    const tarefa = this.listaTarefas.find(t => t.id === evento.id);
    if (tarefa) {
      tarefa.status = evento.status;
    }
  }

  removerTarefa(id: number) {
    this.listaTarefas = this.listaTarefas.filter(tarefa => tarefa.id !== id);
  }

  limparFormulario() {
    this.titulo = '';
    this.responsavel = '';
    this.descricao = '';
    this.prioridade = 'Baixa';
    this.data = '';
  }

  get totalAberto() { return this.listaTarefas.filter(t => t.status === 'Pendente').length; }
  get totalAndamento() { return this.listaTarefas.filter(t => t.status === 'Em andamento').length; }
  get totalConcluida() { return this.listaTarefas.filter(t => t.status === 'Concluída').length; }

  get totalBaixa() { return this.listaTarefas.filter(t => t.prioridade === 'Baixa').length; }
  get totalMedia() { return this.listaTarefas.filter(t => t.prioridade === 'Média').length; }
  get totalAlta() { return this.listaTarefas.filter(t => t.prioridade === 'Alta').length; }
}
