const Validator = resolve('validator');
const Message = require('../models/Message');
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
        let messages = await Message.all({orderBy: {column: 'created_at', order: 'DESC'}});

        messages = await Message.load(messages, 'user');

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

        message = await Message.load(message, 'user');

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
            message: 'required'
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
        let message = await Message.findOrFail(request.params.id);

        await Message.delete(message);

        return await response.json(
            MessageResource.make(message)
        );
    },
};
