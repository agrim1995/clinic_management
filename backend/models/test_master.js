const { Model, DataTypes} = require("sequelize") ;
module.exports = ( sequelize, DataTypes) => {
    class test_master extends Model{
         
        static associate (models){

        }
    }
    test_master.init({

        test_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
        test_name:{
            type : DataTypes.STRING,
            allowNull: false
        },
        test_mini_value:{
            type: DataTypes.STRING,
            allowNull:false
        },
        test_max_value: {
            type: DataTypes.STRING,
            allowNull: false
        },
        range_description: {
            type: DataTypes.STRING,
            allowNull:false
        }
    },
{
  sequelize,
  modelName  : "test_master",
  tableName : "test_master",
  timestamps: false
})
return test_master
}
