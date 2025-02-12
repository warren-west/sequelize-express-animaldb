require('dotenv').config()
const { Sequelize } = require('sequelize')
// const fs = require('fs')
// const path = require("path")
// const basename = path.basename(__filename)

// initial the db object that we'll add to and export
const db = {}

// connect to the database with environment variables
// const sequelize = new Sequelize(
//     process.env.DATABASE_NAME,
//     process.env.DATABASE_USERNAME,
//     process.env.DATABASE_PASSWORD,
//     {
//         dialect: process.env.DIALECT,
//         dialectModel: process.env.DIALECTMODEL,
//     })

const connection = {
    dialect: 'mysql',
    dialectModel: 'mysql2',
    database: 'animaldb',
    username: 'root',
    password: 'admin',
    host: 'localhost'
}
const sequelize = new Sequelize(connection)

// attach the sequelize object we just created to db (which is exported)
db.sequelize = sequelize

// also attach all the model files in this folder to db
// fs.readdirSync(__dirname)
//     // get all files from this models folder, except this file (index.js)
//     .filter(file => {
//         return (file.indexOf('.') !== 0) && (file !== basename) &&
//             (file.slice(-3) === '.js')
//     })
//     // then attach them (they are models) to db
//     .forEach(file => {
//         const model = require(path.join(__dirname, file))(sequelize,Sequelize)
//         db[model.name] = model
//         console.log(db)
//     })

// we could also just add each model we create manually
db.Animal = require('./animal')(sequelize)
db.Toy = require('./toy')(sequelize)
db.Species = require('./species')(sequelize)

// create associations (multiplicities)
db.Animal.belongsTo(db.Species)
db.Animal.belongsToMany(db.Toy, { through: 'AnimalToy' })
db.Species.hasMany(db.Animal, {
    onDelete: 'CASCADE' // by default, onDelete: 'SET NULL'
})
db.Toy.belongsToMany(db.Animal, { through: 'AnimalToy' })

// Object.keys(db).forEach(modelName => {
//     if (db[modelName].associate) {
//         db[modelName].associate(db)
//     }
// })

require('../db/seedDatabase')(db)

module.exports = db