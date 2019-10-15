const app = resolve('app');
const handler = resolve('handler');

module.exports = {
    /**
     * Make a GET route.
     *
     * @param url
     * @param action
     */
    get(url, action) {
        app.get(url, handler(action));
    },

    /**
     * Make a POST route.
     *
     * @param url
     * @param action
     */
    post(url, action) {
        app.post(url, handler(action));
    },

    /**
     * Make a PUT route.
     *
     * @param url
     * @param action
     */
    put(url, action) {
        app.put(url, handler(action));
    },

    /**
     * Make a DELETE route.
     *
     * @param url
     * @param action
     */
    delete(url, action) {
        app.delete(url, handler(action));
    },

    /**
     * Add middleware.
     *
     * @param url
     * @param action
     */
    use(url, action) {
        app.use(url, handler(action));
    },
};
