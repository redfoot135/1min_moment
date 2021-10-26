'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      email: 'asdf@naver.com',
      name: 'John Doe',
      password: '1234',
      regularMember: true,
      social: false,
      refreshToken: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'qwer@naver.com',
      name: 'Kimcoding',
      password: '1234',
      regularMember: false,
      social: false,
      refreshToken: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
