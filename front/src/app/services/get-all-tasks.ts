import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TasksResponse } from '../models/tasks-response';

@Injectable({
  providedIn: 'root'
})
export class GetAllTasks {
  // conexao da api de captura de task cadastradas(obs: não incluido possibilidade de paginação devido pendencia na estrutura html impossibilitando paginação sem ser por console)
  private apiUrl = 'http://localhost/api-teste-luanQuevedo-unip/api/getAll-tasks.php';

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<TasksResponse> {
    return this.http.get<TasksResponse>(this.apiUrl);
  }
}
