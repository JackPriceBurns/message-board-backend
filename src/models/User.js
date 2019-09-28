const _ = require('lodash');
const model = require('./Model');

module.exports = _.merge(model, {
    table: 'users',
});
