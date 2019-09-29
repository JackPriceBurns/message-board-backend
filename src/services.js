// Core Services
const resolver = require('./resolver');
const config = require('./config');

global.resolve = resolver.resolve;
global.registerService = resolver.register;

registerService('config', config);

// Services
const db = require('./database');
const handler = require('./handler');
const validator = require('./validator');

registerService('db', db);
registerService('handler', handler);
registerService('validator', validator);
