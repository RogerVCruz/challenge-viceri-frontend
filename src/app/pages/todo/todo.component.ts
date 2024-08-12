import { Component, OnInit } from '@angular/core';
import {
  ITodoStatus,
  TodoCardComponent,
  TodoPriority,
} from '../../shared/components/todo-card/todo-card.component';
import { TodoService } from '../../core/services/todo.service';
import { ITodo } from '../../core/models/todo.model';
import { SlidePanelComponent } from '../../shared/ui/slide-panel/slide-panel.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [TodoCardComponent, SlidePanelComponent, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  todos: ITodo[] = [];
  todoStatus = ITodoStatus;
  todoPriority = TodoPriority;
  isSlidePanelOpen = false;
  todoId: string | null = null;
  filterByStatus = '';
  constructor(private todoService: TodoService, private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      description: new FormControl('', [Validators.required]),
      priority: new FormControl('LOW', [Validators.required]),
      status: new FormControl('PENDING', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos() {
    this.todoService.getAllTodo(this.filterByStatus).subscribe({
      next: (response) => {
        console.log(response);
        this.todos = response;
      },
    });
  }

  openSlidePanel() {
    this.isSlidePanelOpen = true;
  }

  onCloseSlidePanel() {
    this.isSlidePanelOpen = false;
    this.todoForm.reset();
    this.todoId = null;
  }

  onFilterByStatus(status: string) {
    this.filterByStatus = status;
    this.getAllTodos();
  }

  onSubmit() {
    if (this.todoForm.valid) {
      if (this.todoId) {
        const status = this.todoForm.get('status')?.value;
        console.log(status);
        this.todoService
          .updateTodo(this.todoId, this.todoForm.value)
          .subscribe({
            next: (response) => {
              this.getAllTodos();
              this.onCloseSlidePanel();
            },
          });
      } else {
        this.todoService.addTodo(this.todoForm.value).subscribe({
          next: (response) => {
            this.getAllTodos();
            this.onCloseSlidePanel();
          },
        });
      }
    } else {
      this.todoForm.markAllAsTouched();
    }
  }

  onDeleteTask() {
    if (!this.todoId) return;
    this.todoService.deleteTodo(this.todoId).subscribe({
      next: (response) => {
        this.getAllTodos();
        this.onCloseSlidePanel();
      },
    });
  }

  onLoadTodoForm(item: ITodo) {
    console.log(item);
    this.todoId = item.id!!;
    this.todoForm.patchValue({
      description: item.description,
      status: item.status.toUpperCase(),
      priority: item.priority.toUpperCase(),
    });
    this.openSlidePanel();
  }
}
