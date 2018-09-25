var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var homeRouter = require('./routes/home');
var MySqlStore = require('express-mysql-session')(session);
var passport = require('passport');

var MyProfile = require('./routes/MyProfile');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//use ssesion store to mysql
app.use(session({
  secret: 'SG9iYnlIaXZl',
  resave: false,
  saveUninitialized: true,
  store: new MySqlStore({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1q2w3e!23',//'1q2w3e!23',
    database: 'o2'
  })
}));
//use passport Local Strategy
app.use(passport.initialize());
app.use(passport.session());


app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);
app.use('/MyProfile', MyProfile);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
