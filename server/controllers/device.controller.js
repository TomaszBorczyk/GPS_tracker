
const Device = require('../models/device.model');
const User = require('../models/user.model');
const userSockets = require('../data/userSockets.data');

module.exports = {

    triggerIO: function(req, res) {
        const device_id = req.body.device_id;
        const io = req.app.get('io');
        console.log('bob');
        console.log(Object.keys(io.clients().sockets));

        io.emit('bob', 'I met you');
        res.send({success: true});
    },

    updateLocation: function(req, res){
        const body = req.body;
        const device_id = body.device_id;
        const newLocation = {
            lat: body.lat,
            lon: body.lon,
        };

        Device
        .findOneAndUpdate(
            { device_id: device_id},
            { $push: { gps_data: newLocation }})
        .populate('owner')
        .then( device => {
            if (!device){
                res.send({message: 'Device not found'});
            } else {
                const io = req.app.get('io');
                const userId = device.owner._id;
                const socketIds = userSockets.getUserSockets(userId);
                console.log('sockets:', socketIds);
                if(socketIds !== undefined) {
                    const message = {
                        device: device_id,
                        location: newLocation
                    };
                    socketIds.forEach( socketId => {
                        if(io.sockets.connected[socketId] !== undefined) {
                            io.sockets.connected[socketId].emit('alert', message);
                        }
                    });
                }

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

                const newDevice = new Device({device_id: device_id, owner: user});
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
        .then( () => {
            // const io = req.app.get('io');
            // io.broadcast.emit('hey', 'I met you');
            res.send({success: true});
        })
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
