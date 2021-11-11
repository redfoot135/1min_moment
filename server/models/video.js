'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.video.belongsTo(models.user, {foreignKey: "user_id"})
      models.video.hasMany(models.views, {foreignKey: 'video_id'})
    }
  };
  video.init({
    title: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    video: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    category1: DataTypes.STRING,
    category2: DataTypes.STRING,
    category3: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'video',
  });
  return video;
};