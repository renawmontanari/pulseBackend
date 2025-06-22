![logopulse2](https://github.com/user-attachments/assets/7a93af43-084c-43b0-b209-a66fbbde3da8)

# 📋 Descrição

O PULSE é uma API desenvolvida em NestJS que fornece autenticação e gerenciamento de colaboradores e feedbacks. A aplicação utiliza Docker para containerização, PostgreSQL como banco de dados, e implementa autenticação segura com JWT e bcrypt.

# 🧗 Desafios Enfrentados
1. Configuração do Sequelize com Docker
Como primeiro projeto com NestJS, enfrentei desafios significativos na configuração do Sequelize para trabalhar com containers Docker. Principais obstáculos:

  - Configuração correta da string de conexão entre containers

  - Sincronização de tempos de inicialização (aplicação vs banco de dados)

  - Definição de modelos Sequelize no contexto do NestJS
  

2. Implementação de Seeds
Desenvolver um sistema robusto de seeds para popular o banco com dados iniciais foi um grande aprendizado:

  - Criação de factories para dados de teste

  - Garantia de ordem de execução das seeds

  - Integração com o sistema de migrations


3. Primeiro Contato com NestJS
Adaptar-me aos conceitos do NestJS exigiu curva de aprendizado:

  - Entendimento de módulos, providers e controllers

  - Implementação de injeção de dependência

  - Configuração de guards

Estruturação do projeto seguindo as convenções do framework

# ✨ Funcionalidades
Autenticação JWT: Sistema seguro de login e registro

Gestão de Colaboradores: CRUD completo para colaboradores

Sistema de Feedbacks: Criação e gerenciamento de feedbacks

ORM: Sequelize para mapeamento objeto-relacional

Containerização: Pronto para execução em Docker

# 🛠 Tecnologias
Backend: NestJS

Banco de Dados: PostgreSQL

Autenticação: JWT, bcrypt

ORM: Sequelize

Containerização: Docker

# 🚀 Como Executar
Pré-requisitos
Docker e Docker Compose instalados

Node.js (versão recomendada: 16.x ou superior)

Clone o repositório:
```bash
git clone https://github.com/seu-usuario/PULSEBACKEND.git
cd PULSEBACKEND
```

Instale as dependências:
```bash
npm install
```

Inicie os containers:
```bash
docker-compose up -d
```

Execute as migrações (se necessário):
```bash
npm run migrate
```

Inicie a aplicação:
```bash
npm run start:dev
```

# 📚 Estrutura do Projeto

```text
PULSEBACKEND/
├── database/          # Configurações do banco de dados
├── src/
│   ├── auth/          # Módulo de autenticação
│   │   ├── dto/       # Data Transfer Objects
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   └── auth.service.ts
│   ├── collaborators/ # Módulo de colaboradores
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── collaborators.controller.ts
│   │   ├── collaborators.module.ts
│   │   └── collaborators.service.ts
│   ├── feedbacks/     # Módulo de feedbacks
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── feedbacks.controller.ts
│   │   ├── feedbacks.module.ts
│   │   └── feedbacks.service.ts
│   └── app.module.ts  # Módulo principal
├── .env.example       # Exemplo de variáveis de ambiente
├── docker-compose.yml # Configuração Docker
└── package.json       # Dependências e scripts
```

# 🌐 Rotas da API

## Autenticação
POST http://localhost:3000/auth/login - Login de usuário

## Collaborators (Colaboradores)
POST http://localhost:3000/collaborators - Criar novo colaborador

GET http://localhost:3000/collaborators - Listar todos colaboradores

GET http://localhost:3000/collaborators/:id - Obter colaborador por ID

PUT http://localhost:3000/collaborators/:id - Atualizar colaborador

DELETE http://localhost:3000/collaborators/:id - Remover colaborador

GET http://localhost:3000/collaborators/:id/feedbacks - Obter feedbacks do colaborador

## Pulsebacks
POST http://localhost:3000/feedbacks - Criar novo feedback

GET http://localhost:3000/feedbacks - Listar todos feedbacks

GET http://localhost:3000/feedbacks/:id - Obter feedback por ID

PUT http://localhost:3000/feedbacks/:id - Atualizar feedback

DELETE http://localhost:3000/feedbacks/:id - Remover feedback

GET http://localhost:3000/feedbacks/collaborator/:collaboratorId - Obter feedbacks por colaborador

# ✉️ Contato
Dev Renan - [prwm.vercel.app]

Link do Projeto: [https://github.com/renawmontanari/pulseBackend]
