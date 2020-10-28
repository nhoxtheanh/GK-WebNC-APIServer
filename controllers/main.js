//const User = require('../models/user');
const Board = require("../models/board");

/* Home */
const home = async(req, res) => {
    // res.render('index', {
    //     title: "Homepage"
    // });
    res.redirect("/homeDashboard");
};

const homeDashboard = async(req, res) => {///////////////////////////////////////////////////// tạm thời
    const allBoards = await Board.getAllBoards();
    res.send(allBoards);
};

module.exports = {
    home,
    homeDashboard,
};