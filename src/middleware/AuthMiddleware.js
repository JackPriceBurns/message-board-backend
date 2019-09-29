const config = resolve('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
    /**
     * Only allow authenticated users.
     *
     * @param request
     * @param response
     * @param next
     *
     * @returns {Promise<void>}
     */
    async auth(request, response, next) {
        let token = request.header('Authorization');

        if (!token) {
            throw new Error('Unauthenticated');
        }

        token = token.replace('Bearer ', '');

        let data = jwt.verify(token, config('jwtSecret'));
        let user = await User.find(data.id);

        if (!user) {
            throw new Error('Unauthenticated');
        }

        request.user = user;

        await next();
    },
};
