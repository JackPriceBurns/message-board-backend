const config = resolve('config');
const server = resolve('server');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const socketManager = require('./socketManager');

const io = require('socket.io').listen(server);

async function authenticate(socket, next) {
    if (!socket.handshake.query || !socket.handshake.query.token){
        return next(new Error('Authentication error'));
    }

    let data = jwt.verify(socket.handshake.query.token, config('jwtSecret'));
    let user = await User.find(data.id);

    if (!user) {
        return next(new Error('Authentication error'));
    }

    socket.decoded = data;

    next();
}

registerService('socketManager', socketManager);

io.use(authenticate)
    .on('connection', socket => {
        socketManager.addSocket(socket);

        socket.on('disconnect', () => {
            socketManager.removeSocket(socket)
        });
    });
