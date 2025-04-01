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
      Markdown.belongsTo(models.User, { foreignKey: 'doctorId', as: 'doctorData' });
      Markdown.belongsTo(models.Clinic, { foreignKey: 'clinicId', as: 'clinicData' });
      Markdown.belongsTo(models.Specialty, { foreignKey: 'specialityId', as: 'specialityData' });
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