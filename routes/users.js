var router = require('express').Router()
var db = require("../models/index")
var UserService = require("../services/userService")
var userService = new UserService(db)
const { canSeeUserDetails } = require('./authMiddlewares')

// /users/:id
router.get('/:userId', canSeeUserDetails, async function (req, res) {
    const user = await userService.getOne(req.params.userId)
    res.render('users/userDetails', { user: user })
})

module.exports = router