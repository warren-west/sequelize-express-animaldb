var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var session = require('express-session');
var passport = require('passport');

const db = require('./models/index')
db.sequelize.sync({ force: true, alter: true })

// const { initializeDb } = require('./db/seedDatabase')
// initializeDb()

const { addUserToRes } = require('./routes/authMiddlewares')
const indexRouter = require('./routes/index')
const animalsRouter = require('./routes/animals')
const speciesRouter = require('./routes/species')
const toysRouter = require('./routes/toys')
const reportsRouter = require('./routes/reports')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')

var app = express()

app.use(session({
  secret: 'animal warrior',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(addUserToRes) // add logged in user to res object for all pages

app.use('/', indexRouter)
app.use('/animals', animalsRouter)
app.use('/species', speciesRouter)
app.use('/toys', toysRouter)
app.use('/reports', reportsRouter)
app.use('/users', usersRouter)
app.use('/login', authRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
