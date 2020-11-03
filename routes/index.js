const express = require("express");
const router = express.Router();
const mainController = require('../controllers/main');
const userController = require('../controllers/user');

const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};
// passport
// const passport = require('passport');
// require('./passport.js');



/* GET Home page. */
router.get('/', mainController.home);

/* GET Home page. */
router.get('/homeDashboard', mainController.homeDashboard);

router.post('/homeDashboard/createBoard', mainController.createBoard);
router.post('/homeDashboard/renameBoard', mainController.renameBoard);
router.post('/homeDashboard/deleteBoard', mainController.deleteBoard);

// /* Login */
// router.get('/login', userController.loginView);
// router.post('/login', userController.login);

// /* Sign up */
// router.get('/signup', userController.signupView);
// router.post('/signup', userController.signup);

// /*logout*/
// router.get('/logout', userController.logout);

// /* Post recipe */
// router.get('/post_recipe', requireLogin, dishController.postRecipePage);
// router.post('/postRecipe', requireLogin, upload.fields([
//     { name: 'image', maxCount: 1 },
//     { name: 'newIngreImages' },
//     { name: 'newExtIngreImages' },
//     { name: 'stepImages' }
// ]), dishController.postRecipe);

// /* Profile */
// router.get("/profile", requireLogin, async(req, res) => {
//     return res.redirect(`/profile/${req.user.userID}`);
// });
// router.get('/profile/:id', userController.profile);

// /* Your own Information */
// router.get('/yourInfo', requireLogin, userController.yourInfo);

// /* Edit Your own Information */
// router.get('/editInfo', requireLogin, userController.editInfoView);
// router.post('/editInfo', requireLogin, userController.editInfo);

// router.post('/uploadUserImage', upload.single('file'), userController.uploadUserImageCtrl); // 'file' là thuộc tính name của input ảnh

// /* Change password */
// router.get('/changePwd', requireLogin, userController.changePwdView);
// router.post('/changePwd', requireLogin, userController.changePwd);

router.get("/error", (req, res) => {
    res.send('Lỗi!');
});


module.exports = router;