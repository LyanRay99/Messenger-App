'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Message_statuses', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      message_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Messages',
          key: 'id'
        }
      },
      read_status: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Message_statuses')
  }
}
