var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var mongodb = require('mongodb');
var mongoose = require('mongoose');
// session setup
//var mongostore = require('connect-mongo')(session);
//var mongourl = "mongodb://localhost:27017/local";
var User = require('./routes/common/UserSchema');
var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret : '!@test',
  resave : true,
  saveUninitialized: true
}));
// 몽구스 스토이인경우.
/*
app.use(session({
  secret: 'test!@$#!',
  store: new mongostore({
    url:mongourl,
    ttl:60 * 60 * 1000// 1시간 설정
  }),
  resave: false,
  saveUninitialized: false,
  cookie : {
    //expires : new Date(253402300000000)
    maxAge: 1000 * 60 * 60 * 24 // 쿠키 유효기간 1시간
  }
}));
*/
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/users', users);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  // CONNECTED TO MONGODB SERVER
  console.log("Connected to mongod server");
});
mongoose.connect('mongodb://localhost:27017/local');

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
));

module.exports = app;
