const AuthManager = resolve('authManager');

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

        try {
            request.user = await AuthManager.retrieveByToken(token);

            return await next();
        } catch(error) {
            throw new Error('Unauthenticated');
        }
    },
};
