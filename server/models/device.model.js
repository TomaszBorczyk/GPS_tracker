const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let DeviceSchema = new Schema({
    deviceId: String,
    name: String,
    gpsData: [
        {
            wakeupTime: String,
            coords: [
                {
                    lat: Number,
                    lon: Number,
                    msg: String,
                    date: { type: Date, default: Date.now },
                }
            ]
        }
    ],

    date_created: { type: Date, default: Date.now },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const DeviceModel = mongoose.model('Device', DeviceSchema);

module.exports = DeviceModel;
