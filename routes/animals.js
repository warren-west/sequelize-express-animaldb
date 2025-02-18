var router = require('express').Router()
const AnimalService = require('../services/animalService')
const SpeciesService = require('../services/speciesService')
const db = require('../models/index')
const { checkIfAuthorized, isAdmin } = require('./authMiddlewares')
const animalService = new AnimalService(db)
const speciesService = new SpeciesService(db)

// get all animals
router.get('/', async function (req, res) {
  const results = await animalService.getAll()

  res.render('animal/animals', { results: JSON.parse(JSON.stringify(results)) })
})

router.get('/add', (req, res) => {  
  res.render('animal/add')
})

router.get('/:id', async (req, res) => {
  const animal = await animalService.getAnimalIncludingSpecies(req.params.id)
  const parsedAnimal = JSON.parse(JSON.stringify(animal))
  const species = await speciesService.getAll()
  const parsedSpecies = JSON.parse(JSON.stringify(species))
  
  // hardcoded some species here because we haven't created the speciesService yet
  res.render('animal/details', { animal: parsedAnimal, species: parsedSpecies })
})

router.post('/add', checkIfAuthorized, isAdmin, async (req, res) => {
  console.log(req.body)

  try {
    let result = await animalService.create(req.body.Name)
    result = JSON.parse(JSON.stringify(result))
    console.log(result)
    if (result) {
      console.log("INSERT SUCCESS")
      res.redirect('/animals')
    }
    else
      res.end()

  } catch (err) {
    console.log(err)
    res.redirect('/animals/add')
  }
})

router.post('/:id/update', checkIfAuthorized, isAdmin, async (req, res) => {
  try {
    console.log(req.body)
    const result = await animalService.update(req.params.id, req.body.Name, req.body.SpeciesId)
    const parsedResult = JSON.parse(JSON.stringify(result))
    console.log(parsedResult)
    if (parsedResult[0] > 0) {
      // if the rows affected is at least 1, then success

      res.redirect('/animals')
    } else {
      res.send("Something went wrong")
    }
    // if success
  } catch (err) {
    console.log(err)
    res.redirect('/animals/' + req.params.id)
  }
})

router.post('/:id/delete', checkIfAuthorized, isAdmin, async (req, res) => {
  try {
    const result = await animalService.delete(req.params.id)
    const parsedResult = JSON.parse(JSON.stringify(result))
    console.log(parsedResult)

    res.redirect('/animals')

  } catch (err) {
    console.log(err)
    res.redirect('/animals/' + req.params.id)
  } 
})

module.exports = router