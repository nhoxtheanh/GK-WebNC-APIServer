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

// // passport
// const session = require('express-session');
// /////const passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;
// // Lấy thông tin những giá trị auth
// var configAuth = require('./auth/auth.js');

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


// //////////////////////////////////////////////////////////////// đăng nhập fb
// app.use(session({
//   secret: "nhoxtheanh"
// }))
// app.use(passport.initialize());
// app.use(passport.session());

// // khi goi facebook login
// app.get('/auth/facebook', passport.authenticate('facebook', {scope : ['email']}));

// // xử lý sau khi user cho phép xác thực với facebook
// app.get('/auth/facebook/callback', passport.authenticate('facebook', { 
//   //successRedirect: '/homeDashboard',  //////////////// check lại redirect chỗ này
//   failureRedirect: '/'
// }), (req, res) => {
//     if (req.user) {
//       let user = req.user;
//       // đăng nhập hợp lệ => lấy userID gắn vào payload của token và gửi về cho client
//       var payload = { userID: user.userID };
//       var token = jwt.sign(payload, jwtOptions.secretOrKey);
//       var fullname = user.fullname;
//       res.json({
//         status: 1,
//         msg: "Đăng nhập thành công!",
//         token: token,
//         fullname: fullname,
//         userID: user.userID,
//       });
//     } else {
//       res.json({ status: -1, msg: "Đăng nhập thất bại." });
//     }
// }) ;


// passport.use(new FacebookStrategy(
//   {
//     clientID: configAuth.facebookAuth.clientID,
//     clientSecret: configAuth.facebookAuth.clientSecret,
//     callbackURL: configAuth.facebookAuth.callbackURL,
//     profileFields: ['id','displayName','email','gender'],
//     passReqToCallback: true
//   },
//   async (request, accessToken, refreshToken, profile, done) => {
//     const username = profile._json.id;  // lấy id của fb làm username
//     const fullname = profile._json.name;
//     const password = "facebook";        // password mặc định
//     const email = profile._json.email;

//     let user = await User.findUsername(username);// tìm kiếm User trong DB với username là id từ FB
 
//     if(user) {
//       console.log("Tìm thấy User trong DB");
//       //console.log(user);
//     }
//     else {
//       // chưa có user thì tạo mới
//       console.log("Tạo User mới");
//       user = await User.addUser(
//         fullname,
//         username,
//         password
//       );
//     }
//     return done(null,user) // trả về user cho callback

    
//   }
// ))

// passport.serializeUser((user, done) => {
//   done(null, user.username)
// })

// passport.deserializeUser((id, done) => {
//   User.findUsername(id, (err, user) => {
//     done(null, user)
//   })
// })

// //////////////////////////////////////////////////////////////// đăng nhập fb