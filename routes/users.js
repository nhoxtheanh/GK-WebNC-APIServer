var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');

/* GET users listing. */
router.get('/', function(req, res) {
    res.send('respond with a resource');
});

// đăng ký tài khoản
router.post('/register', userController.signup)

module.exports = router;