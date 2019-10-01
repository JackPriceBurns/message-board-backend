const app = resolve('app');
const handler = resolve('handler');
const HomeController = require('../src/controllers/HomeController');
const AuthController = require('../src/controllers/AuthController');

// Home page.
app.get('/', handler(HomeController.home));

// Login route.
app.post('/auth', handler(AuthController.auth));
