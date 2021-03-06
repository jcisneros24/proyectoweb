var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var indexRouter = require('./routes/IndexRoutes');
var usersRouter = require('./routes/UserRoutes');
var modalUtil = require('./src/util/ModalUtil');
var app = express();

// connection database
const CONNECTION_URL = 'mongodb+srv://hherrera:hherrera@proyectoweb-mjsjk.mongodb.net/proyectoweb?retryWrites=true&w=majority';
const DATABASE_NAME = "proyectoweb";
mongoose.Promise = global.Promise;
mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true, 
  useUnifiedTopology: true}
).then(() => {
  console.log("Connected to `" + DATABASE_NAME + "`!");
}).catch(err => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);

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

app.use(function(req, res, next){
  modalUtil.showModal();
});

module.exports = app;