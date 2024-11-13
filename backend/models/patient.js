'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    static associate(models) {
      
    }
  }
  Patient.init({
    patient_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
       },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 25],
          msg: "enter valid name"
        },
        notNull: {
          msg: "name can not be empty"
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [10, 10],
          msg: "invalid phone number"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    
    age: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 2],
          msg: "enter valid age"
        },
        notNull: {
          msg: "age can not be empty"
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "gender can not be empty"
        }
      }
    },
    
    blood_group: {
      type: DataTypes.STRING,
      allowNull: true,
    }, 
  },
  {
    sequelize,
    modelName: 'Patient',
    tableName: 'patient',
    timestamps: false
  });
  return Patient;
};
