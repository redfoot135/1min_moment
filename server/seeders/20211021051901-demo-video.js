'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('videos', [
      {
        title: "바람과 함께 사라지다",
        user_id: 1,
        video: "https://1min-video.s3.ap-northeast-2.amazonaws.com/videos/cd1620d3-d93a-4e48-a5c5-d8249b01182d.mp4",
        thumbnail: "https://1min-video.s3.ap-northeast-2.amazonaws.com/images/27bd9371-9a9a-433b-9141-fec916d89ec8.jpeg",
        category1: "영화",
        category2: "로맨스",
        category3: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "유미의 세포들",
        user_id: 1,
        video: "https://1min-video.s3.ap-northeast-2.amazonaws.com/videos/cd1620d3-d93a-4e48-a5c5-d8249b01182d.mp4",
        thumbnail: "https://1min-video.s3.ap-northeast-2.amazonaws.com/images/27bd9371-9a9a-433b-9141-fec916d89ec8.jpeg",
        category1: "로맨스",
        category2: "드라마",
        category3: "애니",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "어벤저스",
        user_id: 1,
        video: "https://1min-video.s3.ap-northeast-2.amazonaws.com/videos/cd1620d3-d93a-4e48-a5c5-d8249b01182d.mp4",
        thumbnail: "https://1min-video.s3.ap-northeast-2.amazonaws.com/images/27bd9371-9a9a-433b-9141-fec916d89ec8.jpeg",
        category1: "영화",
        category2: "마블",
        category3: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "오징어 게임",
        user_id: 1,
        video: "https://1min-video.s3.ap-northeast-2.amazonaws.com/videos/cd1620d3-d93a-4e48-a5c5-d8249b01182d.mp4",
        thumbnail: "https://1min-video.s3.ap-northeast-2.amazonaws.com/images/27bd9371-9a9a-433b-9141-fec916d89ec8.jpeg",
        category1: "드라마",
        category2: "넷플릭스",
        category3: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "이웃집 토토로",
        user_id: 1,
        video: "https://1min-video.s3.ap-northeast-2.amazonaws.com/videos/cd1620d3-d93a-4e48-a5c5-d8249b01182d.mp4",
        thumbnail: "https://1min-video.s3.ap-northeast-2.amazonaws.com/images/27bd9371-9a9a-433b-9141-fec916d89ec8.jpeg",
        category1: "애니",
        category2: "감성",
        category3: "일본",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "센과 치히로의 행방불명",
        user_id: 1,
        video: "https://1min-video.s3.ap-northeast-2.amazonaws.com/videos/cd1620d3-d93a-4e48-a5c5-d8249b01182d.mp4",
        thumbnail: "https://1min-video.s3.ap-northeast-2.amazonaws.com/images/27bd9371-9a9a-433b-9141-fec916d89ec8.jpeg",
        category1: "애니",
        category2: "일본",
        category3: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "듄",
        user_id: 1,
        video: "https://1min-video.s3.ap-northeast-2.amazonaws.com/videos/cd1620d3-d93a-4e48-a5c5-d8249b01182d.mp4",
        thumbnail: "https://1min-video.s3.ap-northeast-2.amazonaws.com/images/27bd9371-9a9a-433b-9141-fec916d89ec8.jpeg",
        category1: "우주",
        category2: "sf",
        category3: "영화",
        createdAt: new Date(),
        updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('videos', null, {});
  }
};
