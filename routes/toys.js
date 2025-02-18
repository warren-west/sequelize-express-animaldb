const router = require('express').Router()
const ToyService = require('../services/toyService')
const db = require('../models/index')
const { checkIfAuthorized, isAdmin } = require('./authMiddlewares')
const toyService = new ToyService(db)

router.get('/', async (req, res) => {
    const results = await toyService.getAllToys()
    const toys = JSON.parse(JSON.stringify(results))

    res.render('toy/toys', { toys })
})

router.get('/add', (req, res) => {
    res.render('toy/add')
})

router.get('/:id', async (req, res) => {
    const result = await toyService.getToyByIdIncludingAnimals(req.params.id)
    const toy = JSON.parse(JSON.stringify(result))
    console.log(toy)
    res.render('toy/details', { toy })
})

router.post('/:id/update', checkIfAuthorized, isAdmin, async (req, res) => {
    try {
        console.log("UPDATE")
        console.log(req.body.Name)
        console.log(req.params.id)

        const result = await toyService.update(req.params.id, req.body.Name)
        const parsedResult = JSON.parse(JSON.stringify(result))
        console.log(parsedResult)

        if (false) console.log("Success")
        else console.log("Nothing was updated")

        res.redirect('/toys')
    } catch (err) {
        console.log(err)
        res.redirect('/toys/' + req.params.id)
    }
})
router.post('/:id/delete', checkIfAuthorized, isAdmin, async (req, res) => {
    try {
        const result = await toyService.delete(req.params.id)
        const parsedResult = JSON.parse(JSON.stringify(result))
        console.log(parsedResult)
    
        if (false) console.log("Success")
        else console.log("Nothing was updated")
    
        res.redirect('/animals')
    } catch (err) {
        console.log(err)
    }
})

module.exports = router