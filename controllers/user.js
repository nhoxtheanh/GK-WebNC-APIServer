// passport
// const bcrypt = require("bcryptjs");
// require("../routes/passport.js");
// var path = require('path');
// const fs = require("fs");
// const requireLogin = require("./../middlewares/auth.mdw");
var passport = require("passport");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = { secretOrKey: "nhoxtheanh" };
var jwt = require("jsonwebtoken");

const User = require("../models/user");

// const loginView = async(req, res) => {
//     res.render("login", {
//         title: constant.appName,
//         layout: false,
//         error_messages: req.flash("error"),
//         success_messages: req.flash("success"),
//     });
// };

const login = async (req, res, next) => {
  const { username, password } = req.body;
  if (username && password) {
    var user = await User.findUsername(username);
    if (!user) {
      res.json({ status: -1, msg: "Vui lòng kiểm tra lại username.", user });
    }
    if (user.password === password) {
      // đăng nhập hợp lệ => lấy userID gắn vào payload của token và gửi về cho client
      var payload = { userID: user.userID };
      var token = jwt.sign(payload, jwtOptions.secretOrKey);
      var fullname = user.fullname;
      res.json({
        status: 1,
        msg: "Đăng nhập thành công!",
        token: token,
        fullname: fullname,
        userID: user.userID,
      });
    } else {
      res.json({ status: 0, msg: "Sai mật khẩu." });
    }
  }
};

// const signupView = async(req, res) => {
//     res.render("signup", {
//         title: constant.appName,
//         layout: false,
//         error_messages: req.flash("error"),
//         success_messages: req.flash("success"),
//     });
// };

const signup = async (req, res, next) => {
  try {
    let existedUsername = await User.findUsername(req.body.username);
    if (existedUsername) {
      res.json({ status: -1, msg: "Username đã tồn tại." });
    } else {
      const result = await User.addUser(
        req.body.fullname.trim(),
        req.body.username.trim(),
        req.body.password.trim()
      );
      res.json({ status: 1, msg: "Tạo tài khoản thành công." });
    }
  } catch (error) {
    next(error);
  }
};

const getUserInfo = async (req, res) => {
  const userID = req.params.userID;
  try {
    let userInfo = await User.getUser(userID);
    if (userInfo) {
      res.json({ status: 1, msg: "Got User", userInfo: userInfo });
    } else {
      res.json({ status: -1, msg: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

const editUserInfo = async (req, res) => {
  const userID = req.params.userID;
  try {
    const info = {
      fullname: req.body.fullname || "",
      gender: req.body.gender || "",
      email: req.body.email || "",
      //birthDate: req.body.birthDate || "",
      address: req.body.address || "",
    };
    const user = await User.setUserInfo(userID, info);
    if (user) {
      res.json({ status: 1, msg: "Success", user: user });
    } else {
      res.json({ status: -1, msg: "Failed" });
    }
  } catch (error) {
    next(error);
  }
};


const loginFacebook = async (req, res, next) => {
  const { username, email, fullname } = req.body;
  const password = "facebook"; // password mặc định
  let user = await User.findUsername(username);// tìm kiếm User trong DB với username là id từ FB

  if(user) {
    console.log("Tìm thấy User trong DB");
  }
  else {
    // chưa có user thì tạo mới
    console.log("Tạo User mới (Facebook)");
    user = await User.createUser(fullname, username, password, email);
  }
  var payload = { userID: user.userID };
  var token = jwt.sign(payload, jwtOptions.secretOrKey);
  res.json({
    status: 1,
    msg: "Đăng nhập thành công!",
    token: token,
    fullname: fullname,
    userID: user.userID,
  });
};

const loginGoogle = async (req, res, next) => {
  const { username, email, fullname } = req.body;
  const password = "google"; // password mặc định
  let user = await User.findUsername(username);

  if(user) {
    console.log("Tìm thấy User trong DB");
  }
  else {
    // chưa có user thì tạo mới
    console.log("Tạo User mới (Google)");
    user = await User.createUser(fullname, username, password, email);
  }
  var payload = { userID: user.userID };
  var token = jwt.sign(payload, jwtOptions.secretOrKey);
  res.json({
    status: 1,
    msg: "Đăng nhập thành công!",
    token: token,
    fullname: fullname,
    userID: user.userID,
  });
};

// const logout = async(req, res) => {
//     req.logOut();
//     res.redirect("/");
// };

// const editInfoView = async(req, res) => {
//     if (req.isAuthenticated()) {
//         const userInfo = await User.getUser(req.user.userID);
//         userInfo.avatarUrl = () => constant.imageStorageLink + constant.userPath + userInfo.avatar;
//         res.render("editInfo", {
//             title: constant.appName,
//             user: req.user,
//             userInfo: userInfo,
//         });
//     } else {
//         res.redirect("/login");
//     }
// };

// const editInfo = async(req, res) => {
//     if (!req.isAuthenticated()) {
//         res.redirect("/login");
//     } else {
//         try {
//             const info = {
//                 firstName: req.body.firstName || "",
//                 lastName: req.body.lastName || "",
//                 gender: req.body.gender || "",
//                 email: req.body.email || "",
//                 birthDate: req.body.birthDate || "",
//                 phone: req.body.phone || "",
//                 address: req.body.address || "",
//             };
//             const user = await User.setUserInfo(req.user.userID, info);
//             if (user) {
//                 res.redirect("/yourInfo");
//             } else {
//                 res.redirect("/error");
//             }
//         } catch (err) {
//             console.log("err", err);
//         }
//     }
// };

module.exports = {
  //     loginView,
  login,
  //     signupView,
  signup,
  getUserInfo,
  editUserInfo,
  loginFacebook,
  loginGoogle,
  //     logout,
  //     profile,
  //     yourInfo,
  //     editInfoView,
  //     editInfo,
  //     uploadUserImageCtrl,
  //     changePwdView,
  //     changePwd,
  //     doFavorite,
};
