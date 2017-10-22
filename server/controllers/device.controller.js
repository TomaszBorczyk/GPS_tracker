
const Device = require('../models/device.model');

module.exports = {

    updateLocation: function(req, res){
        const body = req.body;
        const device_id = req.body.device_id;
        const newLocation = {
            lat: body.lat,
            lon: body.lon,
        };

        Device
        .findOneAndUpdate(
            { device_id: device_id},
            { $push: { gps_data: newLocation }})
        .then( () => res.send({success: true}))
        .catch( err => res.send({success: false, err: err}))
    },

    registerDevice: function(req, res){
        const device_id = req.body.device_id;

        Device
        .findOne( {device_id: device_id})
        .then( device => {
            if (device !== null) throw 'Device with that id already exists';
            else { return device; }
        })
        .then( () => Device.create({device_id: device_id}))
        .then( device => res.send({success: true, device: device}))
        .catch( err => res.send({success: false, err: err}));
    }
}
