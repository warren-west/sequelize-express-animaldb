const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        FirstName: DataTypes.STRING,
        LastName: DataTypes.STRING,
        Username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        EncryptedPassword: {
            type: DataTypes.BLOB,
            allowNull: false
        },
        Salt: {
            type: DataTypes.BLOB,
            allowNull: false
        },
        Role: {
           type: DataTypes.STRING,
           defaultValue: "User"
        }
    },{
        timestamps: false
    });

    return User
}