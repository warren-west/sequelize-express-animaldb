const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    const Species = sequelize.define('Species', {
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Ball"
        }
    },{
        timestamps: false,
    });
    

    return Species
}