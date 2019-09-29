const _ = require('lodash');
const config = resolve('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const validator = resolve('validator');

module.exports = {
    /**
     * Show the home page.
     *
     * @param request
     * @param response
     *
     * @returns {function}
     */
    async auth(request, response) {
        await validator.validate(request.body, {
            email: 'required|email',
            password: 'required'
        });

        let {email, password} = request.body;

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

        let token = jwt.sign(_.pick(user, ['id', 'name', 'email']), config('jwtSecret'));

        return await response.json({data: {token}});
    },
};
