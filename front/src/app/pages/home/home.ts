import { Component, OnInit } from '@angular/core';
import { Nav } from '../../components/nav/nav';
import { CardAluno } from '../../components/card-aluno/card-aluno';
import { SearchBar } from '../../components/search-bar/search-bar';
import { CardTask } from '../../components/card-task/card-task';
import { Footer } from "../../components/footer/footer";
import { Task } from '../../models/task';
import { CreateTask } from '../../services/create-task';
import { GetAllTasks } from '../../services/get-all-tasks';
import { DeleteTask } from '../../services/delete-task';
import { EditTask } from '../../services/edit-task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Nav,
    CardAluno,
    SearchBar,
    CardTask,
    Footer,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {

  //variaveis utilizadas para definir modal como aberto ou fechado
  toggleClassModalAddVar: boolean = false;
  toggleClassModalEditVar: boolean = false;
  toggleClassModalDeleteVar: boolean = false;

  //variaveis pra cadastro de tasks
  cadastroTask: Task = {
    textTask: '',
    textMateria: ''
  };

  //variavel necessaria para realizar o map das tasks
  tasks: Task[] = [];

  filteredTasks: Task[] = [] //task filtrada

  //variavel para identificar o id da task selecionada
  taskSelecionada?: Task;

  //captura o status de logado fornecido da page login(atribuido valor true caso acesse a rota da gerenciador-de-tarefas)
  navLogado = localStorage.getItem('logado') === 'true';

  //Inicializa api getAllTasks toda vez que a pagina inicia fornecendo assim os cards de tasks já criadas(OBS: Cards não estão renderizando de inicio necessario interação com modal de criação de task ou campo de busca)
  ngOnInit(): void {
    this.getAllTasksService.getAllTasks().subscribe({
      next: (data) => {
        console.log('Dados recebidos do banco de dados:', data);
        this.tasks = data.tasks;
        this.filteredTasks = [...this.tasks]; // responsavel pela funcionalidade de filtro possibilitando apenas a renderização de cards correspondentes ao texto fornecido
      },
      error: (err) => console.error('Erro ao carregar tarefas', err)
    });
  }

  constructor(
    private createTaskService: CreateTask,
    private getAllTasksService: GetAllTasks,
    private deleteTaskService: DeleteTask,
    private editTaskService: EditTask,
    private router: Router
  ) { }
  // realiza busca por texto da atividade e por nome de matéria já que ficou pendente criação do filtro de materia devido falta da estrutura html com modal de filtro
  procurarTarefa(query: string) {
    const q = query.toLowerCase().trim();
    this.filteredTasks = this.tasks.filter(task =>
      task.textTask.toLowerCase().includes(q) ||
      task.textMateria.toLocaleLowerCase().includes(q)
    );
  }

  //function para criar tarefas e fechamento do modal apos concluir processo
  criarTarefa() {
    this.createTaskService.cadastroTask(this.cadastroTask).subscribe({
      next: (res) => {
        console.log('Tarefa criada com sucesso :)', res);
        alert('Tarefa criada com sucesso. Atualize a pagina:)',);
        this.cadastroTask = { textTask: '', textMateria: '' };
        this.closeModalAdd();
      },
      error: (err) => {
        console.error('Erro ao criar sua tarefa:', err);
        alert('Erro ao criar sua tarefa:',);
      }
    });
  }
  // function para deletar tarefas com base no id e realiza fechamento do modal apos conclusão
  deletarTarefa() {
    if (!this.taskSelecionada?.id) return;

    this.deleteTaskService.deleteTaskById(this.taskSelecionada).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task.id !== this.taskSelecionada?.id)
        this.taskSelecionada = undefined!;
        this.closeModalDelete();
      },
      error: (err) => {
        console.error('Erro ao excluir a tarefa:', err);
        alert('Erro ao excluir tarefa:',);
      }
    });
  }

  //function para edição de tasks com base no id fornecido e realiza fechamento do modal apos conclusão
  editarTarefa() {
    if (!this.taskSelecionada) return;
    this.editTaskService.EditTaskById(this.taskSelecionada).subscribe({
      next: () => {
        alert('Tarefa atualizada com sucesso! Atualize a página para ver as mudanças :)');
        this.closeModalEdit();
      },
      error: (err) => {
        alert('Erro ao atualizar tarefa')
      }
    })
  }

  //atribui ao botão logout a ação de retornar a pagina inicial de login e remove a class on dentro do nav
  deslogar() {
    this.router.navigate(['']);
  }
  //adição da class open e remove a mesma
  toggleClassModalAdd() {
    this.toggleClassModalAddVar = !this.toggleClassModalAddVar;
  }

  //adição da class open e identifica qual id da task selecionada
  toggleClassModalEdit(task: Task) {
    this.taskSelecionada = task;
    this.toggleClassModalEditVar = true
  }
  //adição da class open e identifica qual id da task selecionada
  toggleClassModalDelete(task: Task) {
    this.taskSelecionada = task;
    this.toggleClassModalDeleteVar = true;
  }

  //define a variavel como false para remoção da class open e fechar o modal
  closeModalAdd() {
    this.toggleClassModalAddVar = false;
  }

  closeModalEdit() {
    this.toggleClassModalEditVar = false;
  }
  closeModalDelete() {
    this.toggleClassModalDeleteVar = false;
  }
}