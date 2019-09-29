const _ = require('lodash');
const Validator = resolve('validator');
const Message = require('../models/Message');
const Comment = require('../models/Comment');
const MessageResource = require('../resources/MessageResource');

module.exports = {
    /**
     * Index the messages.
     *
     * @param request
     * @param response
     *
     * @returns {function}
     */
    async index(request, response) {
        let messages = await Message.all({orderBy: {column: 'created_at'}});
        let comments = await Comment.all({orderBy: {column: 'created_at', order: 'DESC'}});

        comments = await Comment.load(comments, 'user');
        messages = await Message.load(messages, 'user');

        messages = _.map(messages, message => {
            message.comments = _.filter(comments, comment => (comment.message_id === message.id));

            return message;
        });

        return response.json(
            MessageResource.collection(messages)
        );
    },

    /**
     * Show a message.
     *
     * @param request
     * @param response
     *
     * @returns {function}
     */
    async show(request, response) {
        let message = await Message.findOrFail(request.params.id);
        let comments = await Comment.all({orderBy: {column: 'created_at'}, where: {column: 'message_id', value: message.id}});

        message = await Message.load(message, 'user');
        comments = await Comment.load(comments, 'user');

        message.comments = comments;

        return response.json(
            MessageResource.make(message)
        );
    },

    /**
     * Store a new message.
     *
     * @param request
     * @param response
     *
     * @returns {function}
     */
    async store(request, response) {
        await Validator.validate(request.body, {
            message: 'required|minLength:10'
        });

        let message = await Message.create({
            message: request.body.message,
            user_id: request.user.id,
        });

        return await response.json(
            MessageResource.make(message)
        );
    },

    /**
     * Update a message.
     *
     * @param request
     * @param response
     *
     * @returns {function}
     */
    async update(request, response) {
        //
    },

    /**
     * Delete a message.
     *
     * @param request
     * @param response
     *
     * @returns {function}
     */
    async destroy(request, response) {
        //
    },
};
