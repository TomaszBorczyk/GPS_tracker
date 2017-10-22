const passportLocalMongoose = require('passport-local-mongoose'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: String,
    email: String,
    devices: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Device'
        }
    ],

    facebook: {
        id: String,
    },

    google: {
        id: String,
    },

    date_created: { type: Date, default: Date.now },
});

UserSchema.plugin(passportLocalMongoose);

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
