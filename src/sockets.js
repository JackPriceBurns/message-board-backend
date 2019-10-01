const server = resolve('server');
const authManager = resolve('authManager');
const socketManager = resolve('socketManager');

// Setup socket.io
const io = require('socket.io').listen(server);

// Function to ensure the user is authenticated.
async function authenticate(socket, next) {
    if (!socket.handshake.query || !socket.handshake.query.token){
        return next(new Error('Authentication error'));
    }

    try {
        socket.user = await authManager.retrieveByToken(socket.handshake.query.token);

        return next();
    } catch (error) {
        return next(new Error('Authentication error'));
    }
}

io.use(authenticate)
    .on('connection', socket => {
        socketManager.addSocket(socket);

        socket.on('disconnect', () => {
            socketManager.removeSocket(socket)
        });
    });
