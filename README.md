# Clinica-NODE

Este projeto é uma aplicação de gerenciamento de pacientes desenvolvida utilizando Node.js e EJS, com estilizações em Bootstrap. Baseia-se no exemplo fornecido pelo repositório [claulis/CRUD at avançado](https://github.com/claulis/CRUD/tree/avançado), criado por Claudio Ulisse como parte da disciplina de Programação para Internet no Instituto Federal de Brasília.

## Funcionalidades

### 1. Listar Pacientes (GET /pacientes)
Exibe uma lista de todos os pacientes cadastrados no banco de dados, incluindo nome, idade, CPF e data/hora da consulta. Caso não haja pacientes, uma mensagem informa que a lista está vazia.

### 2. Adicionar Paciente (GET /pacientes/add e POST /pacientes/add)
- *GET /pacientes/add*: Mostra um formulário para adicionar um novo paciente, com campos para nome, idade, CPF, e data/hora da consulta.
- *POST /pacientes/add*: Recebe e valida os dados do formulário. Utiliza a biblioteca `cpf-cnpj-validator` para validar o CPF. Se o CPF for válido, o paciente é adicionado ao banco de dados; caso contrário, o usuário é notificado sobre o erro.

### 3. Editar Paciente (GET /pacientes/update e POST /pacientes/update)
- *GET /pacientes/update*: Exibe uma lista de pacientes para que o usuário selecione qual deseja atualizar. O usuário pode editar as informações do paciente selecionado.
- *POST /pacientes/update*: Recebe os dados atualizados e valida o CPF. Se o CPF for válido, as informações do paciente são atualizadas; se inválido, uma mensagem de erro é exibida.

### 4. Apagar Paciente (GET /pacientes/delete e POST /pacientes/delete)
- *GET /pacientes/delete*: Mostra um formulário para o usuário inserir o CPF do paciente a ser removido.
- *POST /pacientes/delete*: Busca o paciente pelo CPF fornecido e o remove do banco de dados se encontrado. Se o CPF não corresponder a nenhum paciente, o usuário é notificado do erro.

## Validações
O sistema utiliza a biblioteca `cpf-cnpj-validator` para garantir que apenas CPFs válidos sejam cadastrados ou editados.

## Tratamento de Erros
Mensagens de erro são fornecidas para falhas de conexão com o banco de dados, CPFs inválidos e pacientes não encontrados, permitindo que o usuário corrija os problemas adequadamente.

## Tecnologias Utilizadas
- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework web para Node.js, utilizado para criar o servidor e definir as rotas.
- **Sequelize**: ORM para Node.js, usado para interagir com o banco de dados.
- **EJS**: Motor de templates para renderização de páginas HTML.
- **cpf-cnpj-validator**: Biblioteca para validação de CPFs.

