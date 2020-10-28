var express = require('express');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
var cors = require('cors');
var env = require('dotenv');
env.config();
const PORT = process.env.PORT;

// Database connection
require('./database/db');

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });
app.use(cors());
app.use('/', indexRouter);
//app.use('/users', usersRouter);

app.listen(PORT, function () {
  console.log('App listening on port ' + PORT + '!');
});