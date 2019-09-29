const app = resolve('app');
const handler = resolve('handler');
const HomeController = require('../src/controllers/HomeController');
const AuthController = require('../src/controllers/AuthController');

module.exports = () => {
    app.get('/', handler(HomeController.home));

    app.post('/auth', handler(AuthController.auth))
};
