const pgp = require('pg-promise')(/* options */)
const db = pgp({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

// Test database connection
db.query('SELECT NOW()')
    .then(res => {
        console.log('Connected to the database', res[0]);
    })
    .catch(err => {
        console.error('Error executing query', err.stack);
    });

module.exports = db;