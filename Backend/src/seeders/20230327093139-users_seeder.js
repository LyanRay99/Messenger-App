'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 'gerthrt',
          username: 'Doe',
          password: 'password',
          email: 'johndoe@me.com',
          full_name: 'John Doe',
          sex: 'female',
          address: 'address',
          birthday: '2000-01-01',
          phone_number: '123456789',
          avatar: 'https://i.imgur.com/johndoe.png',
          role: 'Client',
          active: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'hsrth',
          username: 'John',
          password: 'password',
          email: 'johndoe@me.com',
          full_name: 'Admin',
          sex: 'male',
          address: 'address',
          birthday: '2000-01-01',
          phone_number: '123456789',
          avatar: 'https://i.imgur.com/johndoe.png',
          role: 'Admin',
          active: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
  }
}
