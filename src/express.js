const cors = require('cors');
const config = resolve('config');
const express = require('express');

// Setup express.
const app = express();

// Accept JSON post data.
app.use(express.json());

// Add cors headers.
app.use(cors());

// Add the app to the resolver.
registerService('app', app);

// Register the router.
registerService('router', require('./services/router'));

// Register the app routes.
require('../routes/api');
require('../routes/guest');

// Listen for http connections.
let server = app.listen(config('app.port'));

// Add the server to the resolver.
registerService('server', server);
