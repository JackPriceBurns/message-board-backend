// Services
require('./src/services');
const config = resolve('config');

// Express
const express = require('express');
const app = express();

// Accept JSON post data.
app.use(express.json());

// Add the app to the resolver.
registerService('app', app);

// Register the app routes.
require('./src/routes')();

// Listen.
app.listen(config('port'));
