// Services
require('./src/services');
const config = resolve('config');

// Express
const express = require('express');
const cors = require('cors');

const app = express();

// Accept JSON post data.
app.use(express.json());

// Add cors headers.
app.use(cors());

// Add the app to the resolver.
registerService('app', app);

// Register the app routes.
require('./src/routes')();

// Listen.
app.listen(config('port'));
