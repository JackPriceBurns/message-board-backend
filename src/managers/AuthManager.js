const config = resolve('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
    /**
     * Get the user from their credentials.
     *
     * @param email
     * @param password
     *
     * @returns {Promise<void>}
     */
    async retrieveByCredentials(email, password) {
        let users = await User.all({
            where: {
                column: 'email',
                value: email,
            },
            limit: 1,
        });

        if (users.length === 0) {
            throw new Error('InvalidLoginDetails');
        }

        let user = users[0];

        if (!await bcrypt.compare(password, user.password)) {
            throw new Error('InvalidLoginDetails');
        }

        return user;
    },

    /**
     * Get the user from their Bearer token.
     *
     * @param token
     *
     * @returns {Promise<*>}
     */
    async retrieveByToken(token) {
        token = token.replace('Bearer ', '');

        try {
            let data = jwt.verify(token, config('app.jwtSecret'));

            return await User.findOrFail(data.id);
        } catch (error) {
            throw new Error('Unauthenticated');
        }
    },

    /**
     * Create a JWT token of the given object.
     *
     * @param object
     *
     * @returns {Promise<string>}
     */
    async signObject(object) {
        try {
            return jwt.sign(object, config('app.jwtSecret'))
        } catch (error) {
            throw new Error('Unauthenticated')
        }
    }
};
