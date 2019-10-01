// Managers
const AuthManager = require('./managers/AuthManager');
const SocketManager = require('./managers/SocketManager');

// Register managers.
registerService('authManager', AuthManager);
registerService('socketManager', SocketManager);
