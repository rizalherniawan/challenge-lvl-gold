const bcrypt = require('bcrypt')
require('dotenv').config()
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasOne(models.biodata, {
        foreignKey: 'user_id',
        as: 'biodata_user'
      })

      user.hasMany(models.confirmOrder, {
        foreignKey: 'user_id',
        as: 'confirmed_user'
      })

      user.belongsToMany(models.item, {
        through: models.order,
        foreignKey: 'user_id',
        as: 'item_user'
      })

      user.belongsToMany(models.item, {
        through: models.orderHistory,
        foreignKey: 'user_id',
        as: 'item_history'
      })
    }
  }
  user.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'please input valid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "password must be filled"
        },
        is: {
          args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,12}$/,
          msg: 'Minimum 8 and maximum 12 characters, at least one uppercase letter, one lowercase letter, one number and one special character:s'
        }
      }
    },
    role: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["USER", "ADMIN"],
      defaultValue: "USER"
    }
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'users',
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
    },
  });
  return user;
};

async function hashPassword(user) {
  const hash = await bcrypt.hash(user.password, parseInt(process.env.GENSALT))
  user.password = hash
}