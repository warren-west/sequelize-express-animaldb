const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    const Role = sequelize.define('Role', {
        Name: DataTypes.STRING
    }, {
        timestamps: false,
    })

    return Role
}