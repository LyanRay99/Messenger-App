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
          username: 'John Doe',
          password: 'password',
          email: 'johndoe@me.com',
          full_name: 'John Doe',
          sex: true,
          address: 'address',
          birthday: '2000-01-01',
          phone_number: '123456789',
          avatar: 'https://i.imgur.com/johndoe.png',
          role: 1,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'John Doe Admin',
          password: 'password',
          email: 'johndoe@me.com',
          full_name: 'John Doe',
          sex: false,
          address: 'address',
          birthday: '2000-01-01',
          phone_number: '123456789',
          avatar: 'https://i.imgur.com/johndoe.png',
          role: 0,
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
