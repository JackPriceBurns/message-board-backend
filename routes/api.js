const router = resolve('router');
const AuthMiddleware = require('../src/middleware/AuthMiddleware');
const UserController = require('../src/controllers/UserController');
const MessageController = require('../src/controllers/MessageController');
const CommentController = require('../src/controllers/CommentController');

router.use('/api', AuthMiddleware.auth);

// User Resource
router.get('/api/users', UserController.index);
router.get('/api/users/:id', UserController.show);

// Message Resource
router.get('/api/messages', MessageController.index);
router.get('/api/messages/:id', MessageController.show);
router.post('/api/messages', MessageController.store);
router.delete('/api/messages/:id', MessageController.destroy);
router.get('/api/messages/:id/comments', CommentController.index);

// Comment Resource
router.post('/api/comments', CommentController.store);
router.delete('/api/comments/:id', CommentController.destroy);
