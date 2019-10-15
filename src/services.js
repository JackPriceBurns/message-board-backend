// Core Services
const ServiceManager = require('./managers/ServiceManager');
const ConfigManager = require('./managers/ConfigManager');

global.resolve = ServiceManager.resolve;
global.registerService = ServiceManager.register;

// Load the configuration.
ConfigManager.set('app', require('../config/config'));

// Register config first as services need access to config.
registerService('config', ConfigManager.get);

// Register services.
registerService('db', require('./services/database'));
registerService('validator', require('./services/validator'));

// Register managers.
registerService('authManager', require('./managers/AuthManager'));
registerService('socketManager', require('./managers/SocketManager'));
registerService('handler', require('./managers/ExceptionManager').handleController);
