//const User = require('../models/user');

/* Home */
const home = async(req, res) => {
    // res.render('index', {
    //     title: "Homepage"
    // });
    res.send('<h1>Đỗ Thế Anh</h1><h2>1712271</h2>');
};

module.exports = {
    home,
};