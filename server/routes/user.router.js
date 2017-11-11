const UserController = require('../controllers/user.controller'),
        router = require('express').Router(),
        passport = require('passport');

router.post('/register', UserController.postRegister);
router.post('/login', passport.authenticate('local'), UserController.postLogin);
router.post('/logout', UserController.logout);
router.get('/user', isLoggedIn, UserController.getUser);

function isLoggedIn(req, res, next) {
        if(req.isAuthenticated()){
                next();
        } else {
                res.send({success: false, err: 'not auth'});
        }
}
module.exports = router;
