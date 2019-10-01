const _ = require('lodash');
const config = {};

module.exports = {
    /**
     * Get the specified value from loaded config.
     *
     * @param path
     *
     * @returns {*}
     */
    get(path) {
        return _.get(config, path);
    },

    /**
     * Set the specified configuration under the given namespace.
     *
     * @param namespace
     * @param configuration
     */
    set(namespace, configuration) {
        config[namespace] = configuration;
    },
};
