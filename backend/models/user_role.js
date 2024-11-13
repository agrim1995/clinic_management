const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class user_role extends Model {
        static associate(models) { 
            user_role.belongsTo(models.role_master, { foreignKey: "role_id", as: "rolename" });
            user_role.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
        }
    }
    user_role.init({
        user_role_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        assign_date: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        assign_by: {
            type: DataTypes.STRING,
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER
        },
       role_id: {
         type: DataTypes.INTEGER
         },
         COMMENT: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: "user_role",
        tableName: "user_role",
        timestamps:false
    });

    return user_role;
};
