const _ = require('lodash');
const moment = require('moment');
const Resource = require('./Resource');
const UserResource = require("./UserResource");

module.exports = _.merge(_.clone(Resource), {
    /**
     * Format the resource.
     *
     * @param resource
     */
    toArray(resource) {
        let user = this.getUser(resource);

        return {
            id: resource.id,
            message: resource.message,
            ...user,
            created_at: moment(resource.created_at).toISOString(),
            updated_at: moment(resource.updated_at).toISOString(),
        };
    },

    /**
     * @param resource
     */
    getUser(resource) {
        if (!resource.user) {
            return {};
        }

        return {user: UserResource.make(resource.user, false)};
    },
});
