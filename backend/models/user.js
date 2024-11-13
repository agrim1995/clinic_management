const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.user_role, { foreignKey: "user_id", as: "user_roles" });
            //User.belongsTo(models.role_master, { foreignKey: "role_id", as: "role" });
         //  User.hasMany(models.Doctor, { foreignKey: 'doctor_user_id', as: 'doctors' });
           User.hasMany(models.clinic_master, { foreignKey: "admin_id", as: "clinicdata" });
        }
    }

    User.init({
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true
        },
        degree: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        active_status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        
        },
     {
        sequelize,
        modelName: 'User',
        tableName: 'user',
        timestamps: false,
    });

    return User;
};
