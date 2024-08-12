import { Component, Input } from '@angular/core';
import { ITodo } from '../../../core/models/todo.model';

export type ITodoType = 'PENDING' | 'DONE';
export type ITodoPriority = 'LOW' | 'MEDIUM' | 'HIGH';
export const ITodoStatus = ['PENDING', 'DONE'];
export const TodoPriority = ['LOW', 'MEDIUM', 'HIGH'];

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.css',
})
export class TodoCardComponent {
  @Input() status: ITodoType = 'PENDING';
  @Input() todo!: ITodo;
  @Input() priority: ITodoPriority = 'LOW';
}
