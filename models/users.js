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
        }
    },{
        timestamps: false
    });

    return User
}