const { Model} = require("sequelize");
module.exports = ( sequelize,DataTypes) => {
     
    class Appointment extends Model{
        static associate (models){
            
         Appointment.belongsTo(models.Patient, { foreignKey: "patient_id", as: "patient" })
         Appointment.belongsTo(models.Doctor, { foreignKey: "doctor_id", as: "doctor" })
        }
    }
    Appointment.init ({
         visit_id :{
            type : DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
         },
         appointment_date_time: {
            type : DataTypes.STRING,
            allowNull: false
         },
         symptoms: {
            type : DataTypes.STRING,
            allowNull : false
         },
         allergy: {
            type: DataTypes.STRING,
            allowNull: true
         },
         appointment_status:{
            type: DataTypes.STRING,
            DefaultValue:true

         },
         patient_id:{
            type : DataTypes.INTEGER
         },
         doctor_id:{
            type: DataTypes.INTEGER
         },
         added_by:{
            type:DataTypes.INTEGER
         }

    },
    {
      sequelize,
      modelName: "Appointment",
      tableName : "appointment",
      timestamps:false
    })

    return Appointment ;
}