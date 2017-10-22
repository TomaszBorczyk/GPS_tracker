const UserController = require('../controllers/user.controller'),
        router = require('express').Router(),
        passport = require('passport');

router.post('/register', UserController.postRegister);
router.post('/login', passport.authenticate('local'), UserController.postLogin);
router.post('/logout', UserController.logout);

module.exports = router;
