const mysql = require('mysql2');
const config = resolve('config');

module.exports = mysql.createPool(config('app.database')).promise();