const User = require('../models/User');
const UserResource = require('../resources/UserResource');

module.exports = {
    /**
     * Index the users.
     *
     * @param request
     * @param response
     *
     * @returns {function}
     */
    async index(request, response) {
        return response.json(
            UserResource.collection(await User.all())
        );
    },

    /**
     * Show a user.
     *
     * @param request
     * @param response
     *
     * @returns {function}
     */
    async show(request, response) {
        return response.json(
            UserResource.make(await User.findOrFail(request.params.id))
        );
    },

    /**
     * Store a new user.
     *
     * @param request
     * @param response
     *
     * @returns {function}
     */
    async store(request, response) {
        //
    },

    /**
     * Update a user.
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
     * Delete a user.
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
