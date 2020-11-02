var express = require('express');
const bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
var cors = require('cors');
var env = require('dotenv');
env.config();
const PORT = process.env.PORT;
const User = require("./models/user");

// Database connection
require('./database/db');


// passport - jwt
var passport = require('passport');
var passportJWT = require('passport-jwt');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {"secretOrKey" : "nhoxtheanh"};
var jwt = require('jsonwebtoken');

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

// lets create our strategy for web token
var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  var user = User.getUser({ userID: jwt_payload.id });
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
// use the strategy
passport.use(strategy);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(PORT, function () {
  console.log('App listening on port ' + PORT + '!');
});