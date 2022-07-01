'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class biodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      biodata.belongsTo(models.user, {
        foreignKey: 'user_id',
        as: 'user_biodata'
      })
    }
  }
  biodata.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "last name must be filled"
        },
        len: {
          args: [2,50],
          msg: 'no longer than 50 chars and less than 2 chars'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "last name must be filled"
        },
        len: {
          args: [2,50],
          msg: 'no longer than 50 chars and less than 2 chars'
        }
      }
    },
    gender: {
      type: DataTypes.ENUM,
      values: ["Male", "Female"],
      allowNull: false,
      validate: {
        isIn: {
          args: [["Male", "Female"]],
          msg: "it is required to fill in the gender column"
        } 
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "address must be filled"
        },
        len: {
          args: [2,50],
          msg: 'no longer than 50 chars and less than 2 chars'
        }
      }
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "dob must be filled"
        },
        ageValidation(dob) {
          const yob = new Date(dob)
          const dateNow = new Date()
          const age = new Date(dateNow - yob).getFullYear() - 1970
          if(age < 10) {
            throw new Error('You must be older than 10')
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'biodata',
    tableName: 'biodatas'
  });
  return biodata;
};