const User = require('../models/user.model'),
    passport = require('passport');

module.exports = {

    //=======================
    // AUTHENTICATION & USER
    //=======================

    postRegister: function (req, res, next) {
        User.register(
            new User({ username: req.body.username, email: req.body.email }),
            req.body.password,
            function (err, user) {
                if (user) { passport.authenticate('local')(req, res, function () { res.send({ success: true }) }) }
                if (err) next(err);
            })
        // .then( user =>  passport.authenticate('local')(req, res, function(){ res.send({success: true})}) )
        // .catch( err => next(err))
    },

    login: function (req, res) {
        console.log('auth:', req.isAuthenticated());
        console.log('LOGIN', req.user);
        res.send(
            {
                id: req.user._id,
                username: req.user.username,
            }
        );
    },

    changePassword: function (req, res) {
        let newPass = req.body.new_password;

        User.findOne({ _id: req.user._id })
            .then(user => {
                if (!user) {
                    console.log('user not found');
                    res.send({ success: false, msg: 'User not found' });
                }
                else { return user.setPassword(newPass) }
            })
            .then(() => user.save())
            .then(() => res.send({ success: true }))
            .catch(err => res.send({ success: false, err: err }))
    },

    getUser: function (req, res) {
        let UserID = req.query.userid;
        User.findOne({ _id: UserID })
            .populate("ratings.author") //uprościć
            .exec(function (err, user) {
                if (err) {
                    console.log(err);
                    res.send({ success: false });
                    return;
                }
                if (!user) {
                    console.log("Can't find this user.");
                    res.send({ success: false });
                }
                if (user) {
                    res.send(user);
                }
            })
    }
}
