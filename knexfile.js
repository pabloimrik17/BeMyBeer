// http://knexjs.org/#Schema
// https://alexzywiak.github.io/running-migrations-with-knex/index.html

// Update with your config settings.

import {defaultConnectionOptions} from "./src/api/shared/Database";

require('dotenv').config();

module.exports = {
    [process.env.TEST_ENVIROMENT]: {
        client: 'mysql2',
        connection: {
            defaultConnectionOptions,
            database: process.env.TEST_DATABASE_NAME,
        },
    },

    [process.env.PROD_ENVIROMENT]: {
        client: 'mysql2',
        connection: {
            defaultConnectionOptions,
            database: process.env.PROD_DATABASE_NAME,
        },
    },
};
