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
        return await response.json(
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
};
