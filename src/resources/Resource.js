const _ = require('lodash');

module.exports = {
    /**
     * Prepare the resource for API return.
     *
     * @param resource
     * @param dataWrap
     *
     * @returns {Object}
     */
    make(resource, dataWrap = true) {
        if (!dataWrap) {
            return this.toArray(resource);
        }

        return {
            data: this.toArray(resource),
        };
    },

    /**
     * Prepare the resources for API return.
     *
     * @param {Object[]} resources
     * @param dataWrap
     *
     * @returns {Object}
     */
    collection(resources, dataWrap = true) {
        if (!dataWrap) {
            return _.map(resources, resource => this.toArray(resource));
        }

        return {
            data: _.map(resources, resource => this.toArray(resource)),
        };
    },

    /**
     * Format the resource.
     *
     * @param resource
     */
    toArray(resource) {
        return {
            //
        };
    }
};
