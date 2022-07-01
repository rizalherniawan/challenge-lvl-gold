'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      orderHistory.belongsTo(models.confirmOrder, {
        foreignKey: 'order_id',
        as: 'confirm_order_history'
      })
    }
  }
  orderHistory.init({
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
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["Unpaid", "Paid"],
      defaultValue: "Unpaid"
    }
  }, {
    sequelize,
    modelName: 'orderHistory',
    tableName: 'orderHistories'
  });
  return orderHistory;
};