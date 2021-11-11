'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class views extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  views.init({
    video_id: DataTypes.INTEGER,
    ip: DataTypes.STRING,
    createdAt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'views',
  });
  return views;
};