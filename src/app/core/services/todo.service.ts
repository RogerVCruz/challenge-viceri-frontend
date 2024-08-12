import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse, ITodo } from '../models/todo.model';
import { HttpClient } from '@angular/common/http';
import { apiEndpoint } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getAllTodo(status: string): Observable<ITodo[]> {
    let queryString = '';
    if (status !== '') {
      queryString = `status=${status}`;
    }
    return this.http.get<ITodo[]>(
      `${apiEndpoint.TodoEndpoint.getAllTodo}${
        queryString ? '?' + queryString : ''
      }`
    );
  }

  addTodo(data: ITodo): Observable<IResponse<ITodo>> {
    return this.http.post<IResponse<ITodo>>(
      `${apiEndpoint.TodoEndpoint.addTodo}`,
      data
    );
  }

  deleteTodo(id: string) {
    return this.http.delete(`${apiEndpoint.TodoEndpoint.deleteTodo}/${id}`, {
      responseType: 'text',
    });
  }

  updateTodo(id: string, data: ITodo): Observable<IResponse<ITodo>> {
    return this.http.patch<IResponse<ITodo>>(
      `${apiEndpoint.TodoEndpoint.updateTodo}/${id}`,
      data
    );
  }
}
