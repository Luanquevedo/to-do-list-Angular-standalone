import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditTask {
// conexao da api de edição de task cadastradas (obs: tipagem dos dados se encontra na pasta models no devido arquivo de interface)
  private apiUrl = 'http://localhost/api-teste-luanQuevedo-unip/api/edit-task.php';

  constructor(private http: HttpClient) { }

  EditTaskById(task: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, task, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
