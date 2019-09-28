const express = require('express');
const handler = require('./src/handler');
const resolver = require('./src/resolver');

const db = require('./src/database');
const app = express();

global.resolve = name => {
    return resolver.resolve(name);
};

resolver.register('db', db);
resolver.register('app', app);
resolver.register('handler', handler);

require('./src/routes')();

app.listen(process.env.APP_PORT || 8000);
