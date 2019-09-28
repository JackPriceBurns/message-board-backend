const _ = require('lodash');
const model = require('./Model');

module.exports = _.merge(_.clone(model), {
    table: 'messages',

    /**
     * User relation.
     *
     * @returns {{type: string, foreignKey: string, table: string, localKey: string}}
     */
    user() {
        return {
            type: 'belongsTo',
            table: 'users',
            localKey: 'user_id',
            foreignKey: 'id',
            resourceName: 'user',
        };
    },
});
