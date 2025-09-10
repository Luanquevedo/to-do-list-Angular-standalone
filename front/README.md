# TesteLuanquevedo

- Projeto de teste Unip Front End e criação de Apis para teste

---

## Funcionalidades criadas Front end e logica

- Criação de atividades.
- Busca de atividades por texto.
- Exclusão de atividades com base no id.
- Edição de atividade com base no id.
- Login
- Logout
- Nav dinamico
- Renderização de componentes

---

## Elementos visuais

- Realizado responsividade para mobile e desktop da pagina de login. para pagina de gerenciador de tarefas responsividade apenas do componente  card do aluno e componente navbar.
- Criação de estilização de modais com base na classe
- Elementos dinamicos do nav com base na classe

---

## Aplicações backend criadas.

- Cadastro de atividades com validação de quantidade minima de caracteres e se possui atividades duplicadas
- Atualização de atividades com base no ID fornecido
- Exclusão de atividades com base no ID
- Captura de todas atividades cadastradas no banco de dados

---

### Pré-requisitos

- apache >= instalado
- Banco de dados MySql configurado e rodando (Import do DB estara disponivel na pasta geral)

---

## Endpoints principais

| Método | Rota                  | Descrição                      |
|--------|-----------------------|--------------------------------|
| POST   | /api/create-task.php  | Cria atividades                |
| PUT    | /delete-task.php      | Exclui atividades              |
| GET    | /edit-task.php        | Edita tividades                |
| DELETE | /getAll-tasks.php     | Consulta todas tividades       |

---

## Variáveis de ambiente importantes

| Variável       | Descrição                     |
|----------------|-------------------------------|
| $host          | URL de conexão do banco       |
| $db            | Nome do banco                 |
| $user          | Usuario do banco              |
| $pass          | Senha do banco                |

---

## Requisitos para inicialização do projeto

- pasta com arquivo de conexao com db e apis criadas precisam estar dentro da htdocs caso utilize xampp para fazer o servidor apache rodar todas Apis
- Necessario fornecer url,usuario e senha de acesso ao DB no arquivo *database.php* dentro da pasta *src* 
- Projeto angular necessario rodar comando *ng s -o* para inicio do projeto
- **OBS: Caso não esteja sendo utilizado a rota padrão http://localhost/api-teste-luanQuevedo-unip/ Sera necessario atualizar todas rotas dentro da pasta services**
