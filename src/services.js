// Core Services
const ServiceManager = require('./managers/ServiceManager');
const ConfigManager = require('./managers/ConfigManager');

global.resolve = ServiceManager.resolve;
global.registerService = ServiceManager.register;

// Load the configuration.
ConfigManager.set('app', require('../config/config'));

// Register config first as services need access to config.
registerService('config', ConfigManager.get);

// Services
const db = require('./services/database');
const validator = require('./services/validator');

// Register services.
registerService('db', db);
registerService('validator', validator);

// Managers
const AuthManager = require('./managers/AuthManager');
const SocketManager = require('./managers/SocketManager');
const ExceptionManager = require('./managers/ExceptionManager');

// Register managers.
registerService('authManager', AuthManager);
registerService('socketManager', SocketManager);
registerService('handler', ExceptionManager.handleController);
