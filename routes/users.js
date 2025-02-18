var router = require('express').Router()
var db = require("../models/index")
// The service is no longer necessary since attaching the current user to every response object,
// See middleware used in app.js, "addUserToRes" 
// var UserService = require("../services/userService")
// var userService = new UserService(db)
const { canSeeUserDetails } = require('./authMiddlewares')

// /users/:id
router.get('/:userId', canSeeUserDetails, async function (req, res) {
    // const user = await userService.getOne(req.params.userId)
    res.render('users/userDetails')
})

module.exports = router