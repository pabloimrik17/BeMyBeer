// http://knexjs.org/#Schema
// https://alexzywiak.github.io/running-migrations-with-knex/index.html

// Update with your config settings.
require('dotenv').config();

module.exports = {
    [process.env.TEST_ENV]: {
        client: 'mysql2',
        connection: {
            host: process.env.TEST_DATABASE_HOST_IP,
            user: process.env.TEST_DATABASE_USER,
            password: process.env.TEST_DATABASE_PASS,
            database: process.env.TEST_DATABASE_NAME,
        },
    },
    [process.env.DEV_ENV]: {
        client: 'mysql2',
        connection: {
            host: process.env.DEV_DATABASE_HOST_IP,
            user: process.env.DEV_DATABASE_USER,
            password: process.env.DEV_DATABASE_PASS,
            database: process.env.DEV_DATABASE_NAME,
        },
    },
    [process.env.PROD_ENV]: {
        client: 'mysql2',
        connection: {
            host: process.env.PROD_DATABASE_HOST_IP,
            user: process.env.PROD_DATABASE_USER,
            password: process.env.PROD_DATABASE_PASS,
            database: process.env.PROD_DATABASE_NAME,
        },
    },
};
