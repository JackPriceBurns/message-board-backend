const _ = require('lodash');
const validator = resolve('validator');
const AuthManager = resolve('authManager');

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

        let user = await AuthManager.retrieveByCredentials(email, password);
        let token = await AuthManager.signObject(_.pick(user, ['id', 'name', 'email']));

        return await response.json({data: {token}});
    },
};
