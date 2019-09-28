const _ = require('lodash');
const moment = require('moment');
const Resource = require('./Resource');
const UserResource = require('./UserResource');
const CommentResource = require('./CommentResource');

module.exports = _.merge(_.clone(Resource), {
    /**
     * Format the resource.
     *
     * @param resource
     */
    toArray(resource) {
        return {
            id: resource.id,
            user: UserResource.make(resource.user, false),
            comments: CommentResource.collection(resource.comments, false),
            message: resource.message,
            created_at: moment(resource.created_at).toISOString(),
            updated_at: moment(resource.updated_at).toISOString(),
        };
    }
});
