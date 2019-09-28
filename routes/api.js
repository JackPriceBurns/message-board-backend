const app = resolve('app');
const handler = resolve('handler');
const UserController = require('../src/controllers/UserController');

module.exports = () => {
    app.get('/users', handler(UserController.index));
    app.get('/users/:id', handler(UserController.show));
    app.post('/users', handler(UserController.store));
    app.put('/users/:id', handler(UserController.update));
    app.delete('/users/:id', handler(UserController.destroy));
};
