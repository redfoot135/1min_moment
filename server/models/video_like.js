'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class video_like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  video_like.init({
    user_id: DataTypes.INTEGER,
    video_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'video_like',
  });
  return video_like;
};