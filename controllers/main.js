//const User = require('../models/user');
const Board = require("../models/board");
var jwtDecode = require('jwt-decode');

/* Home */
const home = async(req, res) => {
    // res.render('index', {
    //     title: "Homepage"
    // });
    res.redirect("/homeDashboard");
};

const homeDashboard = async(req, res) => {
    token = req.headers.authorization;
    try {
        const payload = jwtDecode(token);
        const userID = payload.userID;
        //const allBoards = await Board.getAllBoards();
        const allBoards = await Board.getAllBoardsByUser(userID);
        res.json({ status: 1, msg: "Ok", allBoards: allBoards });
    }
    catch(err) {
        res.json({ status: -1, msg: err })
    }
};

const createBoard = async(req, res) => {
    token = req.headers.authorization;
    name = req.body.boardName;
    try {
        const payload = jwtDecode(token);
        const userID = payload.userID;
        const b = await Board.addBoard(userID, name);
        const initCols = await Board.initColumns(b.boardID);
        res.json({ status: 1, msg: "Ok" });
    }
    catch(err) {
        res.json({ status: -1, msg: err })
    }
};

const renameBoard = async(req, res) => {
    token = req.headers.authorization;
    boardID = req.body.boardID;
    name = req.body.boardName;
    try {
        const payload = jwtDecode(token);
        const userID = payload.userID;
        const b = await Board.updateBoardName(boardID, name);
        res.json({ status: 1, msg: "Ok" });
    }
    catch(err) {
        res.json({ status: -1, msg: err })
    }
};

const deleteBoard = async(req, res) => {
    token = req.headers.authorization;
    boardID = req.body.boardID;
    try {
        const payload = jwtDecode(token);
        const userID = payload.userID;
        const b = await Board.deleteBoardByID(boardID);
        res.json({ status: 1, msg: "Ok" });
    }
    catch(err) {
        res.json({ status: -1, msg: err })
    }
};

const getBoardDetail = async(req, res) => {
    const boardID = req.params.boardID;
    token = req.headers.authorization;
    try {
        const payload = jwtDecode(token);
        const userID = payload.userID;
        const boardDetails = await Board.getBoardColumns(boardID);      /// TODO: hiện tại mới chỉ get đến Column, chưa xử lý card
        res.json({ status: 1, msg: "Ok", boardDetails: boardDetails });
    }
    catch(err) {
        res.json({ status: -1, msg: err })
    }
};

module.exports = {
    home,
    homeDashboard,
    createBoard,
    renameBoard,
    deleteBoard,
    getBoardDetail
};