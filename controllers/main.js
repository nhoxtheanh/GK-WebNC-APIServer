//const User = require('../models/user');
const Board = require("../models/board");
var jwtDecode = require("jwt-decode");

/* Home */
const home = async (req, res) => {
  // res.render('index', {
  //     title: "Homepage"
  // });
  res.redirect("/homeDashboard");
};

const homeDashboard = async (req, res) => {
  token = req.headers.authorization;
  try {
    const payload = jwtDecode(token);
    const userID = payload.userID;
    //const allBoards = await Board.getAllBoards();
    const allBoards = await Board.getAllBoardsByUser(userID);
    res.json({ status: 1, msg: "Ok", allBoards: allBoards });
  } catch (err) {
    res.json({ status: -1, msg: err });
  }
};

const createBoard = async (req, res) => {
  token = req.headers.authorization;
  name = req.body.boardName;
  try {
    const payload = jwtDecode(token);
    const userID = payload.userID;
    const b = await Board.addBoard(userID, name);
    const initCols = await Board.initColumns(b.boardID);
    res.json({ status: 1, msg: "Ok" });
  } catch (err) {
    res.json({ status: -1, msg: err });
  }
};

const renameBoard = async (req, res) => {
  token = req.headers.authorization;
  boardID = req.body.boardID;
  name = req.body.boardName;
  try {
    const payload = jwtDecode(token);
    const userID = payload.userID;
    const b = await Board.updateBoardName(boardID, name);
    res.json({ status: 1, msg: "Ok" });
  } catch (err) {
    res.json({ status: -1, msg: err });
  }
};

const deleteBoard = async (req, res) => {
  token = req.headers.authorization;
  boardID = req.body.boardID;
  try {
    const payload = jwtDecode(token);
    const userID = payload.userID;
    const b = await Board.deleteBoardByID(boardID);
    res.json({ status: 1, msg: "Ok" });
  } catch (err) {
    res.json({ status: -1, msg: err });
  }
};

const getBoardDetail = async (req, res) => {
  const boardID = req.params.boardID;
  token = req.headers.authorization;
  try {
    const payload = jwtDecode(token);
    const userID = payload.userID;
    const board = await Board.getBoardByID(boardID);
    const boardDetails = await Board.getBoardColumns(boardID);
    res.json({ status: 1, msg: "Ok", boardDetails: boardDetails, boardName: board.name });
  } catch (err) {
    res.json({ status: -1, msg: err });
  }
};

const addCard = async (req, res) => {
  token = req.headers.authorization;
  const content = req.body.content;
  const columnID = req.body.columnID;

  try {
    const payload = jwtDecode(token);
    const userID = payload.userID;
    const col = await Board.addCard(columnID, content);
    res.json({ status: 1, msg: "Ok", column: col });
  } catch (err) {
    res.json({ status: -1, msg: err });
  }
};

const getCard = async (req, res) => {
  const columnID = req.params.columnID;
  token = req.headers.authorization;
  try {
    const payload = jwtDecode(token);
    const userID = payload.userID;
    const cards = await Board.getCards(columnID);
    res.json({ status: 1, msg: "Ok", cards: cards });
  } catch (err) {
    res.json({ status: -1, msg: err });
  }
};

const editCard = async (req, res) => {
  token = req.headers.authorization;
  const newContent = req.body.newContent;
  const cardID = req.body.cardID;

  try {
    const payload = jwtDecode(token);
    const userID = payload.userID;
    const card = await Board.editCard(cardID, newContent);
    res.json({ status: 1, msg: "Ok", card: card });
  } catch (err) {
    res.json({ status: -1, msg: err });
  }
};

const deleteCard = async (req, res) => {
  token = req.headers.authorization;
  const cardID = req.body.cardID;

  try {
    const payload = jwtDecode(token);
    const userID = payload.userID;
    const card = await Board.deleteCard(cardID);
    res.json({ status: 1, msg: "Ok", card: card });
  } catch (err) {
    res.json({ status: -1, msg: err });
  }
};

function generateRandomString(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const sharedBoard = async (req, res) => {
  token = req.headers.authorization;
  boardID = req.body.boardID;
  host = req.body.host;
  try {
    const payload = jwtDecode(token);
    const userID = payload.userID;
    const sharedURL = host + '/sharedBoard/'+ generateRandomString(10);
    const b = await Board.setBoardURL(boardID, sharedURL);
    res.json({ status: 1, msg: "Ok", board: b });
  } catch (err) {
    res.json({ status: -1, msg: err });
  }
};

const getSharedBoardDetail = async (req, res) => {
  const boardKey = req.params.boardKey;
  const boardURL =  req.headers['referer'] || req.headers.referrer || req.headers.referer || req.header('Referrer') || req.header('Referer') || req.get('Referrer');
  token = req.headers.authorization;
  try {
    const payload = jwtDecode(token);
    const userID = payload.userID;
    const board = await Board.findBoardByURL(boardURL);
    const boardDetails = await Board.getBoardColumns(board.boardID);
    res.json({ status: 1, msg: "Ok", boardDetails: boardDetails, boardName: board.name });
  } catch (err) {
    res.json({ status: -1, msg: err });
  }
};

module.exports = {
  home,
  homeDashboard,
  createBoard,
  renameBoard,
  deleteBoard,
  getBoardDetail,
  getCard,
  addCard,
  editCard,
  deleteCard,
  sharedBoard,
  getSharedBoardDetail,
};
