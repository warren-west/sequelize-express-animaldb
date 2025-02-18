const { checkIfAuthorized } = require('./authMiddlewares')
const ReportService = require('../services/reportService')
const db = require('../models/index')
const reportService = new ReportService(db)

const router = require('express').Router()

router.get('/', checkIfAuthorized, async (req, res) => {
    let report = {}

    // get total species
    let results = await reportService.fireCustomSql("getTotalSpecies")
    report.totalSpecies = JSON.parse(JSON.stringify(results))
    console.log(report.totalSpecies)
    
    // get total animals
    results = await reportService.fireCustomSql("getTotalAnimals")
    report.totalAnimals = JSON.parse(JSON.stringify(results))
    console.log(report.totalAnimals)
    
    // get total toys
    results = await reportService.fireCustomSql("getTotalToys")
    report.totalToys = JSON.parse(JSON.stringify(results))
    console.log(report.totalToys)
    
    // get popular toys
    results = await reportService.fireCustomSql("getPopularToys")
    report.popularToys = JSON.parse(JSON.stringify(results))
    console.log(report.popularToys)
    
    // get animal names with P...
    results = await reportService.fireCustomSql("getAnimalNamesWithP")
    report.pNames = JSON.parse(JSON.stringify(results))
    console.log(report.pNames)
    
    // get animal names asc...
    results = await reportService.fireCustomSql("getAnimalNamesAsc")
    report.animalNamesOrdered = JSON.parse(JSON.stringify(results))
    console.log(report.animalNamesOrdered)

    // get animal names asc...
    results = await reportService.fireCustomSql("getAnimalsPerSpecies")
    report.animalsPerSpecies = JSON.parse(JSON.stringify(results))
    console.log(report.animalNamesOrdered)

    res.render('reports', { report })
})

module.exports = router