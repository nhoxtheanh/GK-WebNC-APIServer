// passport
// const passport = require("passport");
// const bcrypt = require("bcryptjs");
// require("../routes/passport.js");
// var path = require('path');
// const fs = require("fs");
// const requireLogin = require("./../middlewares/auth.mdw");
// const constant = require("../Utils/constant");

const User = require("../models/user");

// const loginView = async(req, res) => {
//     res.render("login", {
//         title: constant.appName,
//         layout: false,
//         error_messages: req.flash("error"),
//         success_messages: req.flash("success"),
//     });
// };

// const login = async(req, res, next) => {
//     passport.authenticate("local", (err, user, info) => {
//         if (err) {
//             return next(err);
//         }
//         if (!user) {
//             req.flash("error", info.message);
//             res.redirect("/login");
//             return;
//         }
//         req.logIn(user, (err) => {
//             if (err) {
//                 return next(err);
//             }
//             const url = req.query.retUrl || "/";
//             return res.redirect(url);
//         });
//     })(req, res, next);
// };

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
//     login,
//     signupView,
     signup,
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
