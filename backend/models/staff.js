const {Model} = require('sequelize');
module.exports = (sequelize,DataTypes)=>{
   class Staff extends Model{
    static associate (models){
        Staff.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    }
   }
   Staff.init({
    staff_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING
    },
    designation:{
        type:DataTypes.STRING
    },
    salary:{
        type:DataTypes.INTEGER
    },
    clinic_id:{
        type:DataTypes.INTEGER
    },
    user_id:{
        type:DataTypes.INTEGER
    },
    phone:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    gender:{
        type:DataTypes.STRING,
    }
   },
   {
    sequelize,
    timestamps:false,
    modelName : "Staff",
    tableName:  "clinic_staff"
   }
)
return Staff;
}