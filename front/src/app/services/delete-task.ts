import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class DeleteTask {
  // conexao da api de exclusão de task com base no id fornecido (obs: tipagem dos dados se encontra na pasta models no devido arquivo de interface)
  private apiUrl = 'http://localhost/api-teste-luanQuevedo-unip/api/delete-task.php';

  constructor(private http: HttpClient) { }

  deleteTaskById(task: Task): Observable<any> {
    return this.http.delete<any>(this.apiUrl, {
      body: { id: task.id }
    });
  }
}
