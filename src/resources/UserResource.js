const _ = require('lodash');
const moment = require('moment');

module.exports = {
    /**
     * Prepare the resource for API return.
     *
     * @param resource
     *
     * @returns {Object}
     */
    make(resource) {
        return this.toArray(resource);
    },

    /**
     * Prepare the resources for API return.
     *
     * @param {Object[]} resources
     */
    collection(resources) {
        return _.map(resources, resource => this.toArray(resource))
    },

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
        }
    }
};
