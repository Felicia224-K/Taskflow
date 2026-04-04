'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      title: Sequelize.STRING,
      completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      projectId: {
        type: Sequelize.UUID,
        references: {
          model: 'Projects',
          key: 'id'
        }
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Tasks');
  }
};