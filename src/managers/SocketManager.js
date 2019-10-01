const sockets = [];
const _ = require('lodash');

module.exports = {
    /**
     * Add a new socket.
     *
     * @param socket
     */
    addSocket(socket) {
        sockets.push(socket);
    },

    /**
     * Remove the given socket.
     *
     * @param socket
     */
    removeSocket(socket) {
        sockets.splice(sockets.indexOf(socket), 1);
    },

    /**
     * Broadcast to all sockets.
     *
     * @param event
     * @param data
     */
    broadcast(event, data) {
        _.each(sockets, socket => {
           socket.broadcast.emit(event, data);
        });
    },
};
