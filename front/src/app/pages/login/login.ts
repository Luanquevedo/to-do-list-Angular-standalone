import { Component } from '@angular/core';
import { Nav } from '../../components/nav/nav';
import { Footer } from '../../components/footer/footer';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    Nav,
    Footer,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  email: string = '';
  senha: string = '';

  //Criado Mock com dados de usuarios para login
  userMock: User[] = [
    { id: 1, email: 'teste@login.com', senha: 'teste' },
    { id: 2, email: 'admin@admin.com', senha: 'admin' }
  ];
  constructor(private router: Router) { }

  //Realiza o bloqueio do hrem do button de login devido falha estrutural do html e adicionado validação de email, senha e atribuião de status logado para habilitar icones no navbar utilizado local storage para armazenar status
  login(event?: MouseEvent) {
    if (event) {
      event.preventDefault();
    }
    if (!this.email || !this.senha) {
      alert('Email e senha devem ser preenchidos')
      return;
    }
    const userLocalizado = this.userMock.find(u => u.email === this.email && u.senha === this.senha);
    if (userLocalizado) {
      localStorage.setItem('logado', 'true');
      this.router.navigate(['/gerenciador-de-tarefas']);
    } else {
      alert('Email ou senha incorretos')
    }
  }
}
