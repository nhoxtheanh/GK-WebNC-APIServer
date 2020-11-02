const mongoose = require("mongoose");
const User = mongoose.model("User");
// const Dish = mongoose.model('Dish');
// const UserFavoriteDish = mongoose.model('UserFavoriteDish');
// const bcrypt = require('bcryptjs');
// const constant = require('../Utils/constant');
// const azureBlob = require('./azure_blob');

module.exports = {
  findUsername(username) {
      return User.findOne({ username: username }).exec();
  },
  addUser(fullname, username, password) { ///////////////email, gender, birthDate, address
    return new Promise((resolve, reject) => {
      today = new Date();
      const newUser = new User({
        fullname: fullname,
        username: username,
        password: password,
        birthDate: today,
        createdDate: today,
      });
      try {
        newUser.save(function (err) {
          if (err) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      } catch (err) {
        console.log("error at signUp" + err);
      }
    });
  },
  getUser(userID) {
    return User.findOne({ userID: userID }).exec();
  },
  // setPassword(userID, pwdNew) {
  //   hash = bcrypt.hashSync(pwdNew, constant.SALT_ROUND);
  //   return User.findOneAndUpdate(
  //     { userID: userID },
  //     {
  //       password: hash,
  //     }
  //   ).exec();
  // },
  setUserInfo(userID, info) {
    return User.findOneAndUpdate(
      { userID: userID },
      {
        fullname: info.fullname || "",
        gender: info.gender || "",
        email: info.email || "",
        birthDate: info.birthDate || "",
        address: info.address || "",
      }
    ).exec();
  },
  
};
