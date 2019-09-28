module.exports = {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'message_board',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};
