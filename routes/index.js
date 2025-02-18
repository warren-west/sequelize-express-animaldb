var express = require('express');
var router = express.Router();
const { initializeDb } = require('../db/seedDatabase')

/* GET home page. */
router.get('/', async function(req, res) {
  // console.log(res.locals.user)

  await initializeDb()

  res.render('index', { title: 'Express' });
});

module.exports = router;
