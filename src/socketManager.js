const _ = require('lodash');

module.exports = {
    sockets: [],

    /**
     * Add a new socket.
     *
     * @param socket
     */
    addSocket(socket) {
        console.log('Socket added.');

        this.sockets.push(socket);
    },

    /**
     * Remove the given socket.
     *
     * @param socket
     */
    removeSocket(socket) {
        console.log('Socket removed.');

        this.sockets.splice(this.sockets.indexOf(socket), 1);
    },

    /**
     * Broadcast to all sockets.
     *
     * @param event
     * @param data
     */
    broadcast(event, data) {
        _.each(this.sockets, socket => {
           socket.broadcast.emit(event, data);
        });
    },
};
