import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// conexao da api de criação de task (obs: tipagem dos dados se encontra na pasta models no devido arquivo de interface)
export class CreateTask {
  private apiUrl = 'http://localhost/api-teste-luanQuevedo-unip/api/create-task.php';

  constructor(private http: HttpClient) { }

  cadastroTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }
}