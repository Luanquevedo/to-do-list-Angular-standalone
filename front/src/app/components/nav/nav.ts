import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.html',
  styleUrl: './nav.scss'
})
export class Nav {
  @Input() isLogado = false;
    @Output() logout = new EventEmitter<void>();

  sair() {
    this.logout.emit();
  }
}
