const _ = require('lodash');
const model = require('./Model');

module.exports = _.merge(_.clone(model), {
    table: 'users',
});
