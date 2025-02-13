var express = require('express');
var router = express.Router();
const AnimalService = require('../services/animalService')
const db = require('../models/index')
const { checkIfAuthorized, isAdmin } = require('./authMiddlewares')
const animalService = new AnimalService(db)

// get all animals
router.get('/', async function(req, res) {
  const results = await animalService.getAll()

  res.render('animal/animals', { results: JSON.parse(JSON.stringify(results)) })
});

router.get('/add', (req, res) => {
  const userId = req.user?.id ?? 0
  const userRole = req.user?.Role ?? "Guest"
  res.render('animal/add', { userId, userRole })
})

router.get('/:id', async (req, res) => {
  const result = await animalService.getAnimalIncludingSpecies(req.params.id)
  const parsedResult = JSON.parse(JSON.stringify(result))

  console.log(parsedResult)

  res.render('animal/details', { animal: parsedResult, species: [ { id: 1, Name: 'Dog' }, { id: 2, Name: 'Cat' }, { id: 3, Name: 'Pig' } ] })
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
  } catch(err) {
    console.log(err)
    res.redirect('/animals/' + req.params.id + '/update')
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
    res.redirect('/animals/' + req.params.id + '/delete')
  }
})

module.exports = router;