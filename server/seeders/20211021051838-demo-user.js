'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      email: 'asdf@naver.com',
      name: 'John Doe',
      password: '',
      regularMember: true,
      social: null,
      refreshToken: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'qwer@naver.com',
      name: 'Kimcoding',
      password: '',
      regularMember: false,
      social: null,
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
