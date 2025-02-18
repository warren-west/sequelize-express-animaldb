const db = require('../models/index')
const fs = require('fs')
const { QueryTypes } = require('sequelize')

async function initializeDb() {
    // await db.sequelize.sync({ force: false })
    // await insertData()

    try {
        // Roles are needed before a user can sign up
        if (await checkIfDBNeedsRoles()) {
            console.log("No roles, adding 'User' and 'Admin'.")
            await insertDataRawQueries('Roles.json')
        }
    } catch (err) {
        console.log(err)
    }

    try {
        // A user needs to sign up before populating the DB with Species, Animals, Toys, AnimalToys
        if (await checkIfDBHasData()) {
            console.log("No animal data, populating the database")
    
            // Note: The order in which you insert data is important! (Dependencies)
            await insertDataRawQueries('Species.json')
            await insertDataRawQueries('Animals.json')
            await insertDataRawQueries('Toys.json')
            await insertDataRawQueries('AnimalToys.json')
        }
    } catch (err) {
        console.log(err)
    }
}

async function insertData() {
    // add into Species table
    await db.Species.bulkCreate([
        { Name: "Cat" },
        { Name: "Dog" },
        { Name: "Hamster" },
    ])

    // add into Toy table
    await db.Toy.bulkCreate([
        { Name: "String" },
        { Name: "Scratch post" },
        { Name: "Teddy bear" },
        { Name: "Ball" },
        { Name: "Stick" }
    ])

    // Create the two roles for users - "User" and "Admin"
    await db.Role.bulkCreate([
        { Name: "User" },
        { Name: "Admin" },
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
    
    const thirdAnimal = await db.Animal.findByPk(3)
    thirdAnimal.addToys([ 4, 5 ])

    const fourthAnimal = await db.Animal.findByPk(4)
    const fifthAnimal = await db.Animal.findByPk(5)

    await fourthAnimal.addToys([ 1, 2 ])
    await fifthAnimal.addToys([ 1, 2, 3 ])
}

async function insertDataRawQueries(filename) {
    const { records } = await JSON.parse(fs.readFileSync('./data/' + filename))

    try {
        for (let r of records) {
            const result = await db.sequelize.query(r.query, {
                raw: true,
                type: QueryTypes.INSERT
            })
            console.log(result)
        }
    } catch (err) {
        console.log(err)
    }
}

async function checkIfDBHasData() {
    try {
        // Fetch the number of animal records in our DB
        const [countAnimals, ] = await db.sequelize.query("SELECT COUNT(*) as total FROM animals", {
            raw: true,
            type: QueryTypes.SELECT
        })
        console.log(countAnimals)
        
        // Fetch the number of user records in our DB
        const [countUsers, ] = await db.sequelize.query("SELECT COUNT(*) as total FROM users", {
            raw: true,
            type: QueryTypes.SELECT
        })
        console.log(countUsers)
        
        if (countUsers.total == 0) {
            // We can't insert any data if there are no users. Our tables depend on users existing.
            return false
        }
        
        if (countAnimals.total == 0) {
            // We should insert data if there are no animals, it means our database needs to be populated.
            return true
        }
    } catch (err) {
        console.log(err)
    }
    
    return false
}

async function checkIfDBNeedsRoles() {
    try {
        // Fetch the number of animal records in our DB
        const [countRoles, ] = await db.sequelize.query("SELECT COUNT(*) as total FROM roles", {
            raw: true,
            type: QueryTypes.SELECT
        })
        console.log(countRoles)
        
        return countRoles.total == 0
        
    } catch (err) {
        console.log(err)
    }
}

module.exports = { initializeDb }