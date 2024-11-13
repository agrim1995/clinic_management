'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role_master extends Model {

    static associate(models) {
      //role_master.belongsTo(models.user, { foreignKey: "role_id", as: "m_role_id" });
     // role_master.belongsTo(models.clinic_master, { foreignKey: "role_id", as: "admin_id" });
    }
  }
  role_master.init({
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "name can not be empty"
        }
      }

    },
    
    description: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "please descrive "
        },
      }
    },
       
  }, {
    sequelize,
    timestamps: false ,
    modelName: 'role_master',
    tableName: 'role_master'
  });
  return role_master;
};
