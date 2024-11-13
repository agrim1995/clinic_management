const {Model, DataTypes} = require("sequelize");
module.exports = (sequelize ,DataTypes) => {
    class test_prescription extends Model{
        static associate (models){

        }
    }
    test_prescription.init({ 
        patient_test_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Date_of_prescription: {
            type: DataTypes.DATE,
            allowNull: false

        },
        Test_result:{
            type: DataTypes.STRING,
            allowNull: false
        },
        prescription_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        test_id:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
    },{
         
        sequelize,
        modelName:'test_prescription',
        tableName: "test_prescription",
        timestamps: false
    })
    return test_prescription;
}