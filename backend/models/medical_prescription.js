const {Model} = require("sequelize");
module.exports = (sequelize ,DataTypes) => {
    class medical_prescription extends Model{
        static associate (models){

        }
    }


    medical_prescription.init({
        medicine_id: {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        medicine_name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        dosage : {
            type : DataTypes.STRING,
            allowNull: false
        },
        frequency : {
            type : DataTypes.STRING,
            allowNull: false
        },
        duration_day: {
            type: DataTypes.STRING,
            allowNull: false
        },
        doctor_remark: { 
            type : DataTypes.STRING,
            allowNull: false
        },
        prescription_id:{
            type : DataTypes.INTEGER,
            allowNull: false
        },
       
    },
    {
     sequelize,
     modelName : "medical_prescription",
     tableName : "medicine_prescription",
     timestamps : false
    })
    return medical_prescription;
}