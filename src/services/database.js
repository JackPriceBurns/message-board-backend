const mysql = require('mysql2');
const config = resolve('config');
const db = mysql.createPool(config('app.database')).promise();

db.query(`
    CREATE TABLE IF NOT EXISTS users
    (
        \`id\`         int(11) unsigned NOT NULL AUTO_INCREMENT,
        \`name\`       varchar(255)     NOT NULL,
        \`email\`      varchar(255)     NOT NULL,
        \`password\`   varchar(255)     NOT NULL,
        \`created_at\` datetime         NOT NULL,
        \`updated_at\` datetime         NOT NULL,
        PRIMARY KEY (\`id\`)
    );
`);

db.query(`
    CREATE TABLE IF NOT EXISTS messages
    (
        \`id\`         int(11) unsigned NOT NULL AUTO_INCREMENT,
        \`user_id\`    int(11) unsigned NOT NULL,
        \`message\`    varchar(255)     NOT NULL,
        \`created_at\` datetime         NOT NULL,
        \`updated_at\` datetime         NOT NULL,
        PRIMARY KEY (\`id\`),
        KEY \`user_id\` (\`user_id\`),
        CONSTRAINT \`messages_ibfk_1\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`)
    );
`);

db.query(`
    CREATE TABLE IF NOT EXISTS comments
    (
        \`id\`         int(11) unsigned NOT NULL AUTO_INCREMENT,
        \`user_id\`    int(11) unsigned NOT NULL,
        \`message_id\` int(11) unsigned NOT NULL,
        \`message\`    varchar(255)     NOT NULL DEFAULT '',
        \`created_at\` datetime         NOT NULL,
        \`updated_at\` datetime         NOT NULL,
        PRIMARY KEY (\`id\`),
        KEY \`user_id\` (\`user_id\`),
        KEY \`message_id\` (\`message_id\`),
        CONSTRAINT \`comments_ibfk_1\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`),
        CONSTRAINT \`comments_ibfk_2\` FOREIGN KEY (\`message_id\`) REFERENCES \`messages\` (\`id\`)
    );
`);

module.exports = db;
