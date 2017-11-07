module.exports.userSockets = [];

module.exports.addSocket = (userId, socketId) => {
    if(module.exports.userSockets[userId] === undefined) {
        module.exports.userSockets[userId] = [socketId];
    } else {
        module.exports.userSockets[userId].push(socketId);
    }
}

module.exports.removeSocket = (userId, socketIdToRemove) => {
    module.exports.userSockets[userId].forEach( (socketId, i) => {
        if (socketId === socketIdToRemove) {
            module.exports.userSockets[userId].splice(i, 1);
        }
    });
}

module.exports.getUserSockets = userId =>  module.exports.userSockets[userId]

