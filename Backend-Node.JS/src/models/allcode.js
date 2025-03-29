'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Allcodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Allcodes.hasMany(models.User, { foreignKey: 'roleID', as: 'roleData' });
      Allcodes.hasMany(models.User, { foreignKey: 'positionID', as: 'positionData' });
      Allcodes.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' });
    }

  }
  Allcodes.init({
    keyMap: DataTypes.STRING,
    type: DataTypes.STRING,
    value_En: DataTypes.STRING,
    value_Vi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Allcodes',
  });
  return Allcodes;
};