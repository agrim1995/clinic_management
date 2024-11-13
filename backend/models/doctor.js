'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {

    static associate(models) {
     // Doctor.hasMany(models.patient, { foreignKey: "doctor_name", as: "doct_name" })
      //Doctor.hasMany(models.reception1, { foreignKey: "doctor", as: "docto_name" })
      Doctor.belongsTo(models.User, { foreignKey: 'doctor_user_id', as: 'user' });
    }
  }
  Doctor.init({
    doctor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true

    },
    specialty: {
      type: DataTypes.STRING,
      allowNull: true,
      
    }
    ,
    address: {
      type: DataTypes.STRING,
      allowNull:true

    },
    experience: {
      type: DataTypes.STRING,
  
    },
    available_days:{
      type:DataTypes.STRING,
      allowNull:true
    },
    available_time:{
      type: DataTypes.STRING,
      allowNull:true
    },
    doctor_user_id:{
      type:DataTypes.INTEGER,
      allowNull:true
    }
  }, {
    sequelize,
    modelName: 'Doctor',
    tableName: 'doctor',
    timestamps:false
  });
  return Doctor;
};