const db = require('../models')

async function initializeDb() {
    await db.sequelize.sync({ force: false, alter: true })
    // await insertData()
}

async function insertData() {
    // add into Species table
    await db.Species.bulkCreate([
        { Name: "Whale" },
        { Name: "Lion" },
        { Name: "Gorilla" },
        { Name: "Bird" }
    ])

    // add into Toy table
    await db.Toy.bulkCreate([
        { Name: "Ball" },
        { Name: "Teddy bear" },
        { Name: "Rope" },
        { Name: "Scratch post" },
        { Name: "Stick" }
    ])

    // add into Animal table
    const animals = require('./animals.json')
    await db.Animal.bulkCreate(animals)

    // add related data
    const firstAnimal = await db.Animal.findByPk(1)
    const secondAnimal = await db.Animal.findByPk(2)
    const firstToy = await db.Toy.findByPk(1)
    
    // one way to add m2m data
    await firstAnimal.addToy(firstToy)
    await firstAnimal.addToy(2)

    // another way to add m2m data
    await secondAnimal.addToys([3, 4, 5])
}

module.exports = { initializeDb }