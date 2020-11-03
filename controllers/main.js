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

module.exports = {
    home,
    homeDashboard,
};