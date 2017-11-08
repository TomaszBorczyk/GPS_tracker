const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let DeviceSchema = new Schema({
    device_id: String,
    name: String,
    gps_data: [
        {
            lat: Number,
            lon: Number,
            msg: String,
            date: { type: Date, default: Date.now },
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
