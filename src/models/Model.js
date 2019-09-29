const db = resolve('db');
const _ = require('lodash');
const moment = require('moment');

module.exports = {
    key: 'id',
    table: undefined,
    timestamps: true,

    /**
     * Get all resources.
     *
     * @param {Object} options
     *
     * @returns {Promise<*>}
     */
    async all(options = null) {
        let query = `SELECT * FROM ${this.table}`;
        let values = null;

        if (options && options.where) {
            query += ` WHERE ${options.where.column} = ?`;
            values = options.where.value;
        }

        if (options && options.orderBy) {
            query += ` ORDER BY ${options.orderBy.column} ${options.orderBy.order || 'ASC'}`;
        }

        if (options && options.limit) {
            query += ` LIMIT ${options.limit}`;
        }

        return await this.query(query, values);
    },

    /**
     * Load the specified relation.
     *
     * @param resources
     * @param relation
     *
     * @returns {Promise<Array>}
     */
    async load(resources, relation) {
        if (!this[relation]) {
            throw `Unable to find relation "${relation}"`;
        }

        relation = this[relation]();

        if (relation.type !== 'belongsTo') {
            throw `Unsupported relationship "${relation.type}"`;
        }

        let single = false;

        if (!Array.isArray(resources)) {
            single = true;

            resources = [resources];
        }

        let ids = _.uniq(_.map(resources, resource => resource[relation.localKey]));

        let results = await this.query(`SELECT * FROM ${relation.table} WHERE ${relation.foreignKey} IN (?)`, [ids]);

        resources = _.map(resources, resource => {
            resource[relation.resourceName] = _.find(results, {[relation.foreignKey]: resource[relation.localKey]});

            return resource;
        });

        return single ? resources[0] : resources;
    },

    /**
     * Get the specified resource.
     *
     * @param {Array|Number} id
     *
     * @returns {Promise<*>}
     */
    async find(id) {
        if (!Array.isArray(id)) {
            return await this.findOne(id);
        }

        return await this.query(`SELECT * FROM ${this.table} WHERE ${this.key} IN (?)`, id);
    },

    /**
     * Get the specified resource.
     *
     * @param {Number} id
     *
     * @returns {Promise<*>}
     */
    async findOne(id) {
        let results = await this.query(`SELECT * FROM ${this.table} WHERE ${this.key} = ? LIMIT 1`, id);

        if (results.length === 0) {
            return null;
        }

        return results[0];
    },

    /**
     * Create the resource in the database.
     *
     * @param data
     *
     * @returns {Promise<void>}
     */
    async create(data) {
        if (this.timestamps) {
            data.created_at = moment().format('YYYY-MM-DD HH:mm:ss');
            data.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');
        }

        let columns = _.join(Object.keys(data), ', ');
        let values = Object.values(data);

        let result = await this.query(`INSERT INTO ${this.table} (${columns}) VALUES (?)`, [values]);

        return await this.findOrFail(result.insertId);
    },

    /**
     * Get the specified resource.
     *
     * @param {Number} id
     * @returns {Promise<*>}
     */
    async findOrFail(id) {
        let resource = this.findOne(id);

        if (!resource) {
            throw new Error('ResourceNotFound');
        }

        return resource;
    },

    /**
     * Query the database.
     *
     * @param query
     * @param values
     *
     * @returns {Promise<*>}
     */
    async query(query, values = null) {
        if (!Array.isArray(values)) {
            values = [values];
        }

        let [results] = await db.query(query, values);

        return results;
    }
};
