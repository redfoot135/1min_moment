'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      email: 'asdf@naver.com',
      name: 'John Doe',
      password: 'eyJhbGciOiJIUzI1NiJ9.MTIzNA.3uhK94TqN8SKSm7A_728hNunJoSOjJYVdF1njGveOSY',
      regularMember: true,
      social: false,
      refreshToken: null,
      salt: '0.9153175177919235',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'qwer@naver.com',
      name: 'Kimcoding',
      password: 'eyJhbGciOiJIUzI1NiJ9.MTIzNA.3uhK94TqN8SKSm7A_728hNunJoSOjJYVdF1njGveOSY',
      regularMember: false,
      social: false,
      refreshToken: null,
      salt: '0.9153175177919235',
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
