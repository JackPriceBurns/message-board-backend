module.exports = {
    /**
     * Show the home page.
     *
     * @param request
     * @param response
     *
     * @returns {function}
     */
    async home(request, response) {
        return await response.json({
            api: 'Message Board API'
        });
    },
};
