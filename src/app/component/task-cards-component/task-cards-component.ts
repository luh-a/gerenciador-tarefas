import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tarefa } from '../../models/tarefaModel';

@Component({
  selector: 'app-task-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-cards-component.html',
  styleUrl: './task-cards-component.css'
})
export class TaskCardsComponent {
  @Input() tarefa!: Tarefa;
  @Output() mudarStatus = new EventEmitter<{ id: number, status: 'Pendente' | 'Em andamento' | 'Concluída' }>();
  @Output() deletar = new EventEmitter<number>();

  alterar(novoStatus: 'Pendente' | 'Em andamento' | 'Concluída') {
    this.mudarStatus.emit({ id: this.tarefa.id, status: novoStatus });
  }

  remover() {
    this.deletar.emit(this.tarefa.id);
  }
}
