# Migrações do Banco de Dados

Este diretório contém as migrações do banco de dados para o Sistema de Feedback Interno.

## Estrutura

- `migrations/`: Contém os arquivos de migração para criar e modificar tabelas
- `sequelize-cli.config.js`: Configuração do Sequelize CLI para migrações
- `migrate.ts`: Script para executar migrações
- `seed.ts`: Script para popular o banco de dados com dados iniciais

## Scripts Disponíveis

### Executar Migrações

```bash
npm run migrate
```

Este comando executa todas as migrações pendentes.

### Desfazer a Última Migração

```bash
npm run migrate:undo
```

Este comando desfaz a última migração aplicada.

### Desfazer Todas as Migrações

```bash
npm run migrate:undo:all
```

Este comando desfaz todas as migrações aplicadas.

### Criar Nova Migração

```bash
npm run migration:create -- nome-da-migracao
```

Este comando cria um novo arquivo de migração com o nome especificado.

## Migrações Existentes

1. `20240101000000-create-collaborators.js`: Cria a tabela de colaboradores
2. `20240101000001-create-feedbacks.js`: Cria a tabela de feedbacks com referências para colaboradores

## Modelo de Nova Migração

```javascript
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Código para aplicar a migração
    // Exemplo: await queryInterface.createTable(...)
  },

  down: async (queryInterface, Sequelize) => {
    // Código para desfazer a migração
    // Exemplo: await queryInterface.dropTable(...)
  }
};
```

## Notas Importantes

- Sempre crie migrações para alterações no esquema do banco de dados
- Nunca modifique migrações já aplicadas em ambientes compartilhados
- Teste as migrações em ambiente de desenvolvimento antes de aplicá-las em produção
- Mantenha o método `down` atualizado para permitir rollbacks