
const Device = require('../models/device.model');
const User = require('../models/user.model');

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
        .then( device => {
            if (!device){
                res.send({message: 'Device not found'});
            } else {
                res.send({device: device});
            }
        })
        .catch( err => res.send({success: false, err: err}))
    },

    registerDevice: function(req, res){
        const device_id = req.body.device_id;
        const user_id = req.body.user_id;
        let foundUser;

        User.findById(user_id)
        .populate('devices')
        .then( user => {
            if (!user) {
                throw 'User not found';
            } else if (user) {
                user.devices.forEach( device => {
                    if (device.device_id === device_id) {
                        throw 'Device already registered to that user';
                    }
                })

                const newDevice = new Device({device_id: device_id});
                foundUser = user;
                foundUser.devices.push(newDevice);
                return newDevice.save();
            }
        })
        .then( device => {
            if (device) {
                return foundUser.save();
            }
        })
        .then( () => res.send({success: true}))
        .catch( err => res.send({err: err}));


        // Device
        // .findOne( {device_id: device_id})
        // .then( device => {
        //     if (device !== null) throw 'Device with that id already exists';
        //     else { return device; }
        // })
        // .then( () => Device.create({device_id: device_id}))
        // .then( device => res.send({success: true, device: device}))
        // .catch( err => res.send({success: false, err: { message: err}}));
    }
}
