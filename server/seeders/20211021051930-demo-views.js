'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('views', [
      {
        ip: ":::1",
        video_id: 1,
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date()
      },
      {
        ip: ":::1",
        video_id: 1,
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date()
      },
      {
        ip: ":::1",
        video_id: 2,
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date()
      },
      {
        ip: ":::1",
        video_id: 1,
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date()
      },
      {
        ip: ":::1",
        video_id: 1,
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date()
      },
      {
        ip: ":::1",
        video_id: 1,
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date()
      },
      {
        ip: ":::1",
        video_id: 2,
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date()
      },
      {
        ip: ":::1",
        video_id: 1,
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date()
      },
      {
        ip: ":::1",
        video_id: 1,
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date()
      },
      {
        ip: ":::1",
        video_id: 1,
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date()
      },
      {
        ip: ":::1",
        video_id: 1,
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date()
      },
      {
        ip: ":::1",
        video_id: 1,
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('views', null, {});
  }
};
