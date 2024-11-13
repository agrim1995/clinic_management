'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class clinic_master extends Model {
    static associate(models) {
      clinic_master.belongsTo(models.User, { foreignKey: 'admin_id', as: 'admin' });
    }
  }

  clinic_master.init({
    clinic_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    clinic_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Clinic name cannot be empty"
        }
      }
    },
    clinic_phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Phone number is required"
        },
        len: {
          args: [10, 10],
          msg: "Phone number must be 10 digits"
        }
      }
    },
    clinic_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Please enter a valid email"
        }
      }
    },
    clinic_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pin_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    gov_reg_id:{
      type:DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      references: {
        model: 'User', 
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'clinic_master',
    tableName: 'clinic_master'
  });

  return clinic_master;
};
