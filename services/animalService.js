class AnimalService {
    constructor(db) {
        this.client = db.sequelize
        this.Animal = db.Animal
    }

    // #region READ section
    async getAll() {
        return this.Animal.findAll()
    }

    async getById(id) {
        // return this.Animal.findByOne({ where: { id }}) // this can also work
        return this.Animal.findByPk({ where: { id } })
    }

    async getAnimalIncludingToys(id) {
        return this.Animal.findOne({
            where: { id },
            include: ['Toy']
        })
    }

    async getAnimalIncludingSpecies(id) {
        return this.Animal.findOne({
            where: { id },
            include: ['Species']
        })
    }

    async getAnimalIncludingToysAndSpecies(id) {
        return this.Animal.findOne({
            where: { id },
            include: ['Toy', 'Species']
        })
    }
    // #endregion
    
    async create(name, speciesId = 1) {
        return this.Animal.create({ Name: name, SpeciesId: speciesId }) // remove the hardcoded value
    }

    async update(id, name, speciesId) {
        return this.Animal.update({ Name: name, SpeciesId: speciesId }, { where: { id } })
    }

    async delete(id) {
        return this.Animal.destroy({ where: { id } })
    }
}

module.exports = AnimalService