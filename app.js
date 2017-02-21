var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var firebase      = require('firebase');
var dotenv        = require('dotenv');

var index         = require('./routes/index');
var users         = require('./routes/users');
var pair          = require('./routes/pair');
var signIn        = require('./routes/signIn');

var app = express();
dotenv.config();

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

app.use('/', index);
app.use('/users', users);
app.use('/pair', pair);
app.use('/signIn', signIn);

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

// var config = {
//   apiKey: "AIzaSyDr7zT513OZY1RTSfOcSbCLMWOwFKe0Ecc",
//   authDomain: "bc-19-pair.firebaseapp.com",
//   databaseURL: "https://bc-19-pair.firebaseio.com",
//   storageBucket: "bc-19-pair.appspot.com",
//   messagingSenderId: "1046714437336"
//   };
//   firebase.initializeApp(config);

module.exports = app;
