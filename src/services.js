// Core Services
const resolver = require('./services/resolver');
const ConfigManager = require('./managers/ConfigManager');

global.resolve = resolver.resolve;
global.registerService = resolver.register;

// Load the configuration.
ConfigManager.set('app', require('../config/config'));

// Register config first as services need access to config.
registerService('config', ConfigManager.get);

// Services
const db = require('./services/database');
const handler = require('./services/handler');
const validator = require('./services/validator');

registerService('db', db);
registerService('handler', handler);
registerService('validator', validator);
