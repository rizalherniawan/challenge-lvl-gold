'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class confirmOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      confirmOrder.belongsTo(models.user, {
        foreignKey: "user_id",
        as: "user_confirmed"
      })

      confirmOrder.hasMany(models.orderHistory, {
        foreignKey: 'order_id',
        as: 'confirm_history'
      })
    }
  }
  confirmOrder.init({
    totalPrice: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: "must be valid integers"
        },
        min: 0
      }
    }
  }, {
    sequelize,
    modelName: 'confirmOrder',
    tableName: 'confirmOrders'
  });
  return confirmOrder;
};