const _ = require('lodash');
const config = require('../config/config');

module.exports = name => _.get(config, name);
