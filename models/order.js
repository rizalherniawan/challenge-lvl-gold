'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  order.init({
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notNull: {
          args: true,
          msg: "amount must be filled"
        },
        min: 0,
        isInt: {
          args: true,
          msg: 'decimal and other than number is not allowed'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'order',
    tableName: 'orders'
  });
  return order;
};