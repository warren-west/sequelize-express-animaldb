class ToyService {
    constructor(db) {
        this.client = db.sequelize
        this.Toy = db.Toy
    }

    // CRUD operations for Toy
    async getAllToys() {
        return this.Toy.findAll()
    }

    async getToyByIdIncludingAnimals(id) {
        return this.Toy.findOne({
            where: { id },
            include: ['Animals']
        })
    }

    async create(name) {
        return this.Toy.create({ Name: name })
    }

    async update(id, name) {
        return this.Toy.update({ Name: name }, { where: { id } })
    }

    async delete(id) {
        return this.Toy.destroy({ where: { id } })
    }
}

module.exports = ToyService