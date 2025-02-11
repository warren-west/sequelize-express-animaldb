const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    const Toy = sequelize.define('Toy', {
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Ball"
        }
    },{
        timestamps: false,
    });
    

    return Toy
}