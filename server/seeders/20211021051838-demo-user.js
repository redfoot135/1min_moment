'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user', [{
      email: 'asdf@naver.com',
      name: 'John Doe',
      password: '1234',
      regular_member: true
    },
    {
      email: 'qwer@naver.com',
      name: 'Kimcoding',
      password: '1234',
      regular_member: false
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
