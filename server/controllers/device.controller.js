
const Device = require('../models/device.model');
const User = require('../models/user.model');
const userSockets = require('../data/userSockets.data');

module.exports = {

    triggerIO: function(req, res) {
        // const deviceId = req.body.deviceId;
        const io = req.app.get('io');
        console.log('bob');
        console.log(Object.keys(io.clients().sockets));

        io.emit('bob', 'I met you');
        res.send({success: true});
    },

    getSockets: function(req, res) {
        console.log(req.app.get('io').sockets.connected);
        res.send({fuck: 'you'});
    },

    updateLocation: function(req, res){
        const body = req.body;
        const deviceId = body.deviceId;
        const wakeupTime = body.wakeupTime;
        const newLocation = {
            lat: body.lat,
            lon: body.lon,
            date: Date.now()
        };

        Device
        .findOne({deviceId: deviceId})
        .populate('owner')
        .then( device => {
            if (!device){
                res.send({message: 'Device not found'});
            } else {
                const io = req.app.get('io');
                const userId = device.owner._id;

                for(let i = 0; i < device.gpsData.length; i+=1) {
                    const data = device.gpsData[i];
                    if(data.wakeupTime === wakeupTime){
                        data.coords.push(newLocation);
                        const gpsData = { deviceId: deviceId, wakeupTime: wakeupTime, coords: [newLocation]};
                        emitToUser(io, userId, deviceId, 'update', gpsData);
                        console.log('update');
                        return device.save();
                    }
                }
                const gpsData = { wakeupTime: wakeupTime, coords: [newLocation]};
                device.gpsData.push(gpsData);
                Object.assign(gpsData, {deviceId: deviceId});
                console.log('alert');
                emitToUser(io, userId, deviceId, 'alert', gpsData);
                return device.save();
            }
        })
        .then( device => res.send({device: device}))
        .catch( err => res.send({err: err}));
    },

    registerDevice: function(req, res){
        const deviceId = req.body.deviceId;
        const userId = req.body.userId;
        let foundUser;

        User.findById(userId)
        .populate('devices')
        .then( user => {
            if (!user) {
                throw 'User not found';
            } else if (user) {
                user.devices.forEach( device => {
                    if (device.deviceId === deviceId) {
                        throw 'Device already registered to that user';
                    }
                })

                const newDevice = new Device({deviceId: deviceId, owner: user});
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
    }
}

function emitToUser(io, userId, deviceId, type, data) {
    const socketIds = userSockets.getUserSockets(userId);
    console.log('sockets:', socketIds);
    if(socketIds !== undefined) {
        socketIds.forEach( socketId => {
            if(io.sockets.connected[socketId] !== undefined) {
                io.sockets.connected[socketId].emit(type, data);
            }
        });
    }

}
