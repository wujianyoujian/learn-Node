var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const RedisStore = require('connect-redis')(session)
const RedisClient = require('./db/redis')
const fs = require('fs')

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var blogRouter = require('./routes/blog');
var userRouter = require('./routes/user');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, '../html-test'));
// app.set('view engine', 'jade');
const logname = path.join(__dirname, 'logs', 'access.log');
const writestream = fs.createWriteStream(logname, {
  flags: 'a'
});
const ENV = process.env.NODE_ENV;
if(ENV === 'dev') {
  app.use(logger('dev'));
} else {
  app.use(logger('combined', {
    stream: writestream
  }))
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../html-test')));

const sessionStore = new RedisStore({
  client: RedisClient
})

app.use(session({
  secret: 'wxx12JIN_#xs',
  cookie: {
    // path: '/',
    // httpOnly: 'true',
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore
}));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
