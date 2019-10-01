const app = resolve('app');
const handler = resolve('handler');
const AuthMiddleware = require('../src/middleware/AuthMiddleware');
const UserController = require('../src/controllers/UserController');
const MessageController = require('../src/controllers/MessageController');
const CommentController = require('../src/controllers/CommentController');

app.use('/api', handler(AuthMiddleware.auth));

// User Resource
app.get('/api/users', handler(UserController.index));
app.get('/api/users/:id', handler(UserController.show));

// Message Resource
app.get('/api/messages', handler(MessageController.index));
app.get('/api/messages/:id', handler(MessageController.show));
app.post('/api/messages', handler(MessageController.store));
app.delete('/api/messages/:id', handler(MessageController.destroy));
app.get('/api/messages/:id/comments', handler(CommentController.index));

// Comment Resource
app.post('/api/comments', handler(CommentController.store));
app.delete('/api/comments/:id', handler(CommentController.destroy));
