const Validator = resolve('validator');
const Message = require('../models/Message');
const Comment = require('../models/Comment');
const CommentResource = require('../resources/CommentResource');

/**
 * Throw an error because the message doesn't exist.
 */
function messageDoesNotExist() {
    let error = Error('ValidationError');

    error.validationErrors = [
        {
            "message": {
                "message_id": "The specified message does not exist.",
                "rule": "exists"
            }
        }
    ];

    throw error;
}

module.exports = {
    /**
     * Index the comments.
     *
     * @param request
     * @param response
     *
     * @returns {function}
     */
    async index(request, response) {
        let message = await Message.findOrFail(request.params.id);

        let page = parseInt(request.query.page) || 1;
        let limit = 10;

        let comments = await Comment.all({
            where: {column: 'message_id', value: message.id},
            orderBy: {column: 'created_at', order: 'DESC'},
            limit: (page - 1) * limit + ', ' + limit,
        });

        comments = await Comment.load(comments, 'user');

        return response.json(
            CommentResource.collection(comments)
        );
    },

    /**
     * Store a new comment.
     *
     * @param request
     * @param response
     *
     * @returns {function}
     */
    async store(request, response) {
        await Validator.validate(request.body, {
            message: 'required|minLength:10',
            message_id: 'required|integer'
        });

        let message = await Message.find(request.body.message_id);

        if (!message) {
            messageDoesNotExist();
        }

        let comment = await Comment.create({
            message: request.body.message,
            user_id: request.user.id,
            message_id: message.id,
        });

        return await response.json(
            CommentResource.make(comment)
        );
    },

    /**
     * Delete a comment.
     *
     * @param request
     * @param response
     *
     * @returns {function}
     */
    async destroy(request, response) {
        let comment = await Comment.findOrFail(request.params.id);

        await Comment.delete(comment);

        return await response.json(
            CommentResource.make(comment)
        );
    },
};
