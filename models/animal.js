const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    const Animal = sequelize.define('Animal', {
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Bingo"
        }
    },{
        timestamps: false,
    });

    return Animal
}