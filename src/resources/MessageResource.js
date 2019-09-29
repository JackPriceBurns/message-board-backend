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
        let user = this.getUser(resource);
        let comments = this.getComments(resource);

        return {
            id: resource.id,
            ...user,
            ...comments,
            message: resource.message,
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

    /**
     * @param resource
     */
    getComments(resource) {
        if (!resource.comments) {
            return {};
        }

        return {comments: CommentResource.collection(resource.comments, false)};
    }
});
