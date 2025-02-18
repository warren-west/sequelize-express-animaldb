const router = require('express').Router()
const db = require('../models/index')
const SpeciesService = require('../services/speciesService')
const speciesService = new SpeciesService(db)

// '/species'
router.get('/', async (req, res) => {
    const results = await speciesService.getAll()
    res.render('species/species', { species: JSON.parse(JSON.stringify(results))})
})

router.get('/add', (req, res) => {
    res.render('species/add')
})

router.get('/:id', async (req, res) => {
    const result = await speciesService.getByIdIncludingAnimals(req.params.id)
    res.render('species/details', { species: JSON.parse(JSON.stringify(result)) })
})

module.exports = router