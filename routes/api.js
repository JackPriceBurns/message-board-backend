const app = resolve('app');
const handler = resolve('handler');
const AuthMiddleware = require('../src/middleware/AuthMiddleware');
const UserController = require('../src/controllers/UserController');
const MessageController = require('../src/controllers/MessageController');

module.exports = () => {
    app.use('/api', handler(AuthMiddleware.auth));

    // User Resource
    app.get('/api/users', handler(UserController.index));
    app.get('/api/users/:id', handler(UserController.show));

    // Message Resource
    app.get('/api/messages', handler(MessageController.index));
    app.get('/api/messages/:id', handler(MessageController.show));
    app.post('/api/messages', handler(MessageController.store));
    app.put('/api/messages/:id', handler(MessageController.update));
    app.delete('/api/messages/:id', handler(MessageController.destroy));
};
