const router = resolve('router');
const HomeController = require('../src/controllers/HomeController');
const AuthController = require('../src/controllers/AuthController');

// Home page.
router.get('/', HomeController.home);

// Login route.
router.post('/auth', AuthController.auth);
