var express = require('express');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

// Database connection
require('./database/db');

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });
app.use('/', indexRouter);
//app.use('/users', usersRouter);

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});