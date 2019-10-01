const objects = {};

module.exports = {
    /**
     * Register an object.
     *
     * @param name
     *
     * @param value
     */
    register(name, value) {
        objects[name] = value;
    },

    /**
     * Return the registered object.
     *
     * @param name
     *
     * @returns {*}
     */
    resolve(name) {
        if (!objects[name]) {
            throw `Unable to resolve "${name}".`;
        }

        return objects[name];
    },
};
