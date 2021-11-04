'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      email: 'asdf@naver.com',
      name: 'John Doe',
      password: '$2b$10$WVMwG1CFa8VjdzbEt.nTiOEuQvhZUxHpZ1emdtO5OFxkYAsRltnH6',
      regularMember: true,
      social: null,
      authToken: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'qwer@naver.com',
      name: 'Kimcoding',
      password: '$2b$10$WVMwG1CFa8VjdzbEt.nTiOEuQvhZUxHpZ1emdtO5OFxkYAsRltnH6',
      regularMember: false,
      social: null,
      authToken: null,
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
