const mongoose = require("mongoose");
require("../database/db");
//const User = mongoose.model('User');
const Board = mongoose.model("Board");
const Column = mongoose.model("Column");
const Card = mongoose.model("Card");

module.exports = {
  getAllBoards() {
    return Board.find().exec();
  },
  getAllBoardsByUser(userID) {
    return Board.find({ ownerID: userID }).exec();
  },
  addBoard(userID, name) {
    return new Board({
      ownerID: userID,
      name: name,
    }).save();
  },
  initColumns(boardID) {
    const Column1 = new Column({
      boardID: boardID,
      name: "Went well",
      color: "green",
    }).save();
    const Column2 = new Column({
      boardID: boardID,
      name: "To improve",
      color: "red",
    }).save();
    const Column3 = new Column({
      boardID: boardID,
      name: "Action items",
      color: "blue",
    }).save();
    return Column1;
  },
  updateBoardName(boardID, name) {
    return new Promise(async (resolve, reject) => {
      const board = await Board.findOne({ boardID: boardID }).exec();
      board.name = name;
      await board.save();
      resolve(board);
    });
  },
  deleteBoardByID(boardID) {
    return new Promise(async (resolve, reject) => {
      const board = await Board.findOne({ boardID: boardID }).exec();
      board.isActive = false;
      await board.save();

      const columns = await Column.updateMany(
        { boardID: boardID },
        { isActive: false }
      );

      resolve(board);
    });
  },
  getBoardColumns(boardID) {
    return Column.find({ boardID: boardID }).exec();
  },
  addCard(columnID, content) {
    return new Card({
      columnID: columnID,
      content: content,
    }).save();
  },
  getCards(columnID) {
    return Card.find({ columnID: columnID }).exec();
  },
  editCard(cardID, newContent) {
    return new Promise(async (resolve, reject) => {
      const card = await Card.findOne({ cardID: cardID }).exec();
      card.content = newContent;
      await card.save();
      resolve(card);
    });
  },
  deleteCard(cardID) {
    return new Promise(async (resolve, reject) => {
      const card = await Card.findOne({ cardID: cardID }).exec();
      card.isActive = false;
      await card.save();
      resolve(card);
    });
  },
  setBoardURL(boardID, sharedURL) {
    return new Promise(async (resolve, reject) => {
      const board = await Board.findOne({ boardID: boardID }).exec();
      board.sharedURL = sharedURL;
      await board.save();
      resolve(board);
    });
  },
  // generateAllBoardURL() {
  //   return new Promise(async (resolve, reject) => {
  //     const board = await Board.updateMany(
  //       { },
  //       { sharedURL: "noURL" }
  //     );
  //     resolve(board);
  //   });
  // },
  findBoardByURL(boardURL) {
    return Board.findOne({ sharedURL: boardURL }).exec();
  },
  // deleteBoardByID(boardID) {
  //     return Board.deleteOne({
  //         boardID: boardID
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
