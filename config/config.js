function env(name, fallback = null) {
    let value = process.env[name];

    if (value === undefined) {
        return fallback;
    }

    return value;
}

module.exports = {
    /**
     * The port to listen on.
     */
    port: env('APP_PORT', 8000),

    /**
     * Debug Mode
     */
    debug: env('APP_DEBUG', false) === 'true',

    /**
     * The JWT secret for signing JWT keys.
     */
    jwtSecret: env('JWT_SECRET', 'L, do you know? Gods of death love apples.'),

    /**
     * Database Connection
     */
    database: {
        host: env('DB_HOST', '127.0.0.1'),
        user: env('DB_USERNAME', 'root'),
        password: env('DB_PASSWORD', ''),
        database: env('DB_DATABASE', 'message_board'),
        connectionLimit: env('DB_LIMIT', 10),
        waitForConnections: true,
        queueLimit: 0
    }
};
