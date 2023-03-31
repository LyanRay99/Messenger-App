'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Group_messages', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      group_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Groups',
          key: 'id'
        }
      },
      sender_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Group_messages')
  }
}
