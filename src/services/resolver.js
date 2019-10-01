module.exports = {
    objects: {},

    /**
     * Register an object.
     *
     * @param name
     *
     * @param value
     */
    register(name, value) {
        this.objects = {
            [name]: value,
            ...this.objects
        };
    },

    /**
     * Return the registered object.
     *
     * @param name
     *
     * @returns {*}
     */
    resolve(name) {
        if (!this.objects[name]) {
            throw `Unable to resolve "${name}".`;
        }

        return this.objects[name];
    },
};
