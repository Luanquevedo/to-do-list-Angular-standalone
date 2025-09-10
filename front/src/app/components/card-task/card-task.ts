import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'app-card-task',
  standalone: true,
  imports: [],
  templateUrl: './card-task.html',
  styleUrl: './card-task.scss'
})
export class CardTask {
  //adicionado eventos para abertura de modais

  @Output() isOpenModalEdit = new EventEmitter<void>()
  @Output() isOpenModalDelete = new EventEmitter<void>()
  @Input() task!: Task;
  openModalEdit() {
    this.isOpenModalEdit.emit();//repassa para home que foi clicado o botão
  }

  openModalDelete() {
    this.isOpenModalDelete.emit();//repassa para home que foi clicado o botão
  }


}
