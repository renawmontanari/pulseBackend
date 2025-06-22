'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('feedbacks', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('public', 'private'),
        defaultValue: 'public',
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      senderId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'collaborators',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      receiverId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'collaborators',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });

    // Adicionar índices para melhorar performance de consultas
    await queryInterface.addIndex('feedbacks', ['senderId']);
    await queryInterface.addIndex('feedbacks', ['receiverId']);
    await queryInterface.addIndex('feedbacks', ['createdAt']);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('feedbacks');
  },
};
