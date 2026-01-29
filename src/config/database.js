const mysql = require('mysql2/promise');

const {
    DB_CONNECTION_LIMIT,
    DB_MAX_IDLE,
    DB_IDLE_TIMEOUT_MS,
} = require('./constant');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: DB_CONNECTION_LIMIT,
    maxIdle: DB_MAX_IDLE, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: DB_IDLE_TIMEOUT_MS, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

module.exports = pool;
