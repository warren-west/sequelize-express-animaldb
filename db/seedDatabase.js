module.exports = async (db) => {
    // add into Species table
    await db.Species.bulkCreate([
        { Name: "Whale"},
        { Name: "Lion"},
        { Name: "Gorilla"},
        { Name: "Bird"}
    ]);
    
    // add into Toys table
    await db.Toy.bulkCreate([
        { Name: "Ball"},
        { Name: "Teddy bear"},
        { Name: "Rope"},
        { Name: "Scratch post"},
        { Name: "Stick"}
    ])
    
    const animals = require('./animals.json')
    // add into Toys table
    await db.Animal.bulkCreate(animals)
}