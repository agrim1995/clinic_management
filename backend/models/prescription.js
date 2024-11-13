const { Model} = require("sequelize") ;
module.exports = ( sequelize,DataTypes)=>{
    class Prescription extends Model{
      static associate (models){
  

      }
    }
  Prescription.init({
    prescription_id :{
        type : DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    symptoms:{
        type: DataTypes.STRING,
        allowNull : false
    },
    observation:{
        type: DataTypes.STRING,
        allowNull: false
    },
    diseases : {
        type : DataTypes.STRING,
        allowNull : false,
        validate: {
            notNull: {
              msg: "diseases name cannot be empty"
            }
        } 
    },
    next_visit_date:{
        type :DataTypes.STRING,
        allowNull: true
    },
    advice : {
        type : DataTypes.STRING,
        allowNull : false
    },
    doctor_id :{
        type:DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
              msg: "doctor id  cannot be empty"
            }
        }
    },
    visit_id : { 
        type : DataTypes.INTEGER
    },
  },
{
   sequelize ,
   modelname : "Prescription",
   tableName : "prescription",
   timestamps : false
})

return Prescription;

}