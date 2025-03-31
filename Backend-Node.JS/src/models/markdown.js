'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Markdown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  Markdown.init({
    contentMarkdown: DataTypes.TEXT('long'),
    contentHTML: DataTypes.TEXT('long'),
    specialityId: DataTypes.INTEGER,
    clinicId: DataTypes.INTEGER,
    doctorId: DataTypes.INTEGER,
    image: DataTypes.STRING,
    introduction: DataTypes.TEXT,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Markdown',
    tableName: 'Markdown',
  });
  return Markdown;
};