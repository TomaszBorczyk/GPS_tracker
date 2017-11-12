const User = require('../models/user.model'),
    passport = require('passport');

module.exports = {

    postRegister: function (req, res) {
        const { email, password } = req.body;

        User.register(
            new User({ email: email }),
            password,
            function (err, user) {
                if (user) {
                    passport.authenticate('local')(req, res, function () {
                        res.send({ success: true })
                        })
                }
                if (err) {
                    res.send({ success: false, error: err });
                }
            })
    },

    postLogin: function (req, res) {
        const user =  {
                _id: req.user._id,
                email: req.user.email,
                devices: req.user.devices
        }
        res.send({user: user});
    },

    logout: function(req, res){
        req.logout();
        res.send({ success: true});
    },

    getUser: function(req, res) {
        User
            .findById(req.user._id, {salt: 0, hash: 0})
            .populate('devices')
            .then( user => {
                if(!user){
                    console.log('user not found');
                    res.send({success: false});
                } else {
                    res.send({success: true, user: user});
                }
            })
    }
}
