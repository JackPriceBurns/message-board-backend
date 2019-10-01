require('dotenv').config();

// Services
require('./src/services');

// Express
require('./src/express');

// Setup socket.io.
require('./src/sockets');
