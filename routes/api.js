const app = resolve('app');
const handler = resolve('handler');
const UserController = require('../src/controllers/UserController');
const MessageController = require('../src/controllers/MessageController');

module.exports = () => {
    app.get('/users', handler(UserController.index));
    app.get('/users/:id', handler(UserController.show));
    // app.post('/users', handler(UserController.store));
    // app.put('/users/:id', handler(UserController.update));
    // app.delete('/users/:id', handler(UserController.destroy));

    app.get('/messages', handler(MessageController.index));
    app.get('/messages/:id', handler(MessageController.show));
    app.post('/messages', handler(MessageController.store));
    app.put('/messages/:id', handler(MessageController.update));
    app.delete('/messages/:id', handler(MessageController.destroy));
};
