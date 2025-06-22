'use strict';

const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

module.exports = {
  async up(queryInterface, Sequelize) {
    // Adiciona a coluna com valor padrão temporário
    await queryInterface.addColumn('collaborators', 'password', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'temp_password',
    });

    const collaborators = await queryInterface.sequelize.query(
      'SELECT id FROM collaborators;',
      { type: queryInterface.sequelize.QueryTypes.SELECT },
    );

    for (const collaborator of collaborators) {
      await queryInterface.sequelize.query(
        `UPDATE collaborators SET password = '${await hashPassword('senha_padrao')}' WHERE id = '${collaborator.id}';`,
      );
    }

    await queryInterface.changeColumn('collaborators', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('collaborators', 'password');
  },
};
