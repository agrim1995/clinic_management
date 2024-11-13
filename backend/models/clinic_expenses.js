const {Model} = require('sequelize');
module.exports = (sequelize,DataTypes)=>{
    class Clinic_expenses extends Model{
        static associate (models){

      }
    }
    Clinic_expenses.init({
        expense_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        clinic_id:{
            type:DataTypes.INTEGER
        },
        expense_by:{
            type:DataTypes.STRING
        },
        item_name:{
            type:DataTypes.STRING
        },
        amount:{
            type:DataTypes.INTEGER,

        },
        expense_date:{
            type:DataTypes.DATE
        },
        entered_by:{
            type:DataTypes.INTEGER
        },
},
{
    sequelize,
    TableNames:"clinic_expenses",
    modelName:"Clinic_expenses",
    timestamps:false
})
return Clinic_expenses;
}