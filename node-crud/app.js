var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var employeesRouter = require('./routes/employees'); // ✅ only once

var Employee = require('./models/Employee');

var app = express();

// --- Middleware ---
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// --- View engine ---
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// --- Routes ---
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/employees', employeesRouter); // ✅ no duplicates

// --- Error Handling ---
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// --- MongoDB Connection ---
const uri = "mongodb+srv://user1:user1@expressdb.bbixes2.mongodb.net/?retryWrites=true&w=majority&appName=expressdb";
async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
connect();

// --- Server ---
app.listen(8001, () => {
  console.log("Server started on port 8001");
});

module.exports = app;
