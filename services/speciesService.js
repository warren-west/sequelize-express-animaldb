class SpeciesService {
    constructor(db) {
        this.client = db.sequelize
        this.Species = db.Species
    }

    async getAll() {
        return this.Species.findAll()
    }

    async getByIdIncludingAnimals(id) {
        return this.Species.findOne({
            where: { id },
            include: ['Animals']
        })
    }

    async create(name) {
        return this.Species.create({ Name: name })
    }

    async update(id, name) {
        return this.Species.update({ Name : name }, { where: { id }})
    }

    async delete(id) {
        return this.Species.destroy({ where: { id }})
    }
}

module.exports = SpeciesService