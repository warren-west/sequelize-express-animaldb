const router = require('express').Router()
var passport = require('passport')
const crypto = require('crypto')
var LocalStrategy = require('passport-local')
const UserService = require('../services/userService')
const db = require('../models/index')
const userService = new UserService(db)

// choose the local strategy for passport
passport.use(new LocalStrategy(function verify(username, password, cb) {
    userService.getOneByName(username)
        .then((data) => {
            if (data === null) {
                return cb(null, false, { message: 'Incorrect username or password.' })
            }
            crypto.pbkdf2(password, data.Salt, 310000, 32, 'sha256', function (err, hashedPassword) {
                if (err) { return cb(err) }
                if (!crypto.timingSafeEqual(data.EncryptedPassword, hashedPassword)) {
                    return cb(null, false, { message: 'Incorrect username or password.' })
                }
                return cb(null, data)
            })
        })
}))

// serializing user data
passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, {
            id: user.id,
            username: user.Username,
            firstName: user.FirstName,
            lastName: user.LastName,
            role: user.Role,
        })
    })
})

// deserializing user data
passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user)
    })
})


// '/login'
router.get('/', (req, res) => {
    const currentUser = req.user ? req.user : undefined
    res.render('auth/login', { currentUser })
})

// post request
router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}), (req, res) => {
    req.session.currentUser = req.user
    res.redirect('/')
})

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err) }
        res.redirect('/')
    })
})

router.get('/signup', (req, res) => {
    const currentUser = req.user ? req.user : undefined
    res.render('auth/signup', { currentUser })
})

router.post('/signup', (req, res) => {
    var salt = crypto.randomBytes(16)
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function (err, hashedPassword) {
        if (err) { return next(err) }
        userService.create(req.body.firstname, req.body.lastname, req.body.username, salt, hashedPassword)
        res.redirect('/login')
    })
})

module.exports = router