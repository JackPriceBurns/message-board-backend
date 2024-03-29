const _ = require('lodash');
const moment = require('moment');
const Resource = require('./Resource');

module.exports = _.merge(_.clone(Resource), {
    /**
     * Format the resource.
     *
     * @param resource
     */
    toArray(resource) {
        return {
            id: resource.id,
            name: resource.name,
            email: resource.email,
            created_at: moment(resource.created_at).toISOString(),
            updated_at: moment(resource.updated_at).toISOString(),
        };
    }
});
