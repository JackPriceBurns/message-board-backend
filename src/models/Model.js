const db = resolve('db');

module.exports = {
    key: 'id',
    table: undefined,

    /**
     * Get all users.
     *
     * @returns {Promise<*>}
     */
    async all() {
        let [results] = await db.query(`SELECT * FROM ${this.table}`);

        return results;
    },

    /**
     * Get the specified user.
     *
     * @param id
     * @returns {Promise<*>}
     */
    async find(id) {
        let [results] = await db.query(`SELECT * FROM ${this.table} WHERE ${this.key} = ? LIMIT 1`, [id]);

        if (results.length === 0) {
            return null;
        }

        return results[0];
    },

    /**
     * Get the specified user.
     *
     * @param id
     * @returns {Promise<*>}
     */
    async findOrFail(id) {
        let [results] = await db.query(`SELECT * FROM ${this.table} WHERE ${this.key} = ? LIMIT 1`, [id]);

        if (results.length === 0) {
            throw new Error('ResourceNotFound');
        }

        return results[0];
    },
};
