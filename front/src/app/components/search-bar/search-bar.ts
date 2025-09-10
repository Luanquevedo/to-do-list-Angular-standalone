import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss'
})
export class SearchBar {

  @Output() isOpenModal = new EventEmitter<void>(); //event para abertura do modal de criação de task
  @Output() searchBar = new EventEmitter<string>() //event para funcionamento da barra de pesquisa

  openModal() {
    this.isOpenModal.emit();//repassa para home que foi clicado o botão
  }

  searchInput(event:Event){
    const value = (event.target as HTMLInputElement).value;
    this.searchBar.emit(value);
  }


}
