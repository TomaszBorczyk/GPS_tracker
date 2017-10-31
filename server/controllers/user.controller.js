const User = require('../models/user.model'),
    passport = require('passport');

module.exports = {

    //=======================
    // AUTHENTICATION & USER
    //=======================

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
            user: {
                id: req.user._id,
                email: req.user.email,
                devices: req.user.devices
            }
        }
        res.send(user);
    },

    logout: function(req, res){
        req.logout();
        res.send({ success: true});
    },

    changePassword: function (req, res) {
        const newPass = req.body.newPass;

        User.findOne({ _id: req.user._id })
            .then(user => {
                if (!user) {
                    console.log('user not found');
                    res.send({ success: false, msg: 'User not found' });
                }
                else { return user.setPassword(newPass) }
            })
            .then(user => user.save())
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
