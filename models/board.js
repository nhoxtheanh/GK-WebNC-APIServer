const mongoose = require('mongoose');
require('../database/db');
//const User = mongoose.model('User');
const Board = mongoose.model('Board');

module.exports = {
    getAllBoards() {
        return Board.find().exec();
    },
    getAllBoardsByUser(userID) {
        return Board.find({ ownerID: userID }).exec();
    },
    addBoard(userID, name) {
        return new Board({
            ownerID:  userID,
            name: name,
        }).save();
    },
    // removeFavoriteDish(userID, dishID) {
    //     return UserFavoriteDish.deleteOne({
    //         dishID: dishID,
    //         userID: userID
    //     }).exec();
    // },
    // getFavoriteDish(query, option) {
    //     option = option || {};
    //     let findPromise = UserFavoriteDish.find(query)
    //         .select({});
    //     // if (option.perPage) {
    //     //     findPromise = findPromise.limit(option.perPage);
    //     //     if (option.page) {
    //     //         findPromise = findPromise.skip(option.perPage * (option.page - 1));
    //     //     }
    //     // }
    //     if (option.sort) {
    //         findPromise = findPromise.sort(option.sort);
    //     }
    //     return findPromise
    //         .populate({
    //             path: 'dish',
    //             populate: [{ path: 'creator' }, { path: 'favoriteNumber' }, { path: 'dishTypes' }, { path: 'cuisines' }, { path: 'diets' }, ]
    //         })
    //         .exec();
    // },
    // updateReviewSent(userID) { // cập nhật lại totalReviewSent của user
    //     return new Promise(async(resolve, reject) => {
    //         const user = await User.findOne({ userID: userID })
    //             .exec();
    //         user.totalReviewSent = parseInt(user.totalReviewSent) + 1;
    //         await user.save();
    //         resolve(user);
    //     })
    // },
};