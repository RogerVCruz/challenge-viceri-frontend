import {
  ITodoPriority,
  ITodoType,
} from '../../shared/components/todo-card/todo-card.component';

export interface IResponse<T> {
  data: T;
  message?: string;
}

export interface ITodo {
  id?: string;
  description: string;
  status: ITodoType;
  priority: ITodoPriority;
  created_at?: string;
}

export interface ITodoUpdateStatus {
  status: ITodoType;
}
