'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      item.belongsToMany(models.user, {
        through: models.order,
        foreignKey: 'item_id',
        as: 'user_item'
      })

      item.belongsToMany(models.user, {
        through: models.orderHistory,
        foreignKey: 'item_id',
        as: 'user_history'
      })
    }
  }
  item.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "product name must be filled"
        },
        len: {
          args: [2,50],
          msg: 'no longer than 50 chars and less than 2 chars'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "category must be filled"
        },
        len: {
          args: [2,50],
          msg: 'no longer than 50 chars and less than 2 chars'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "price must be filled"
        },
        isInt: {
          args: true,
          msg: 'decimal is not allowed'
        }
      }
    },
    stocks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "stock must be filled"
        },
        min: 0,
        isInt: {
          args: true,
          msg: 'decimal is not allowed'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'item',
    tableName: 'items'
  });
  return item;
};