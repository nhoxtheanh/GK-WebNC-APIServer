var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');

/* GET users listing. */
router.get('/', function(req, res) {
    res.send('respond with a resource');
});

// đăng ký tài khoản
router.post('/signup', userController.signup)

// đăng nhập
router.post('/login', userController.login)


router.get('/:userID', userController.getUserInfo);
router.post('/:userID', userController.editUserInfo);

module.exports = router;