const passportLocalMongoose = require('passport-local-mongoose'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: String,
    devices: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Device'
        }
    ],
    date_created: { type: Date, default: Date.now },
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
