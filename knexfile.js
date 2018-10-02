// http://knexjs.org/#Schema
// https://alexzywiak.github.io/running-migrations-with-knex/index.html

// Update with your config settings.

require('dotenv').config();
const {moment} = require('./src/api/shared/common.api');

module.exports = {

    development: {
        client: 'mysql2',
        connection: {
            host: process.env.DATABASE_HOST_IP,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASS,
            database: process.env.TEST_DATABASE_NAME,
            charset: process.env.DATABASE_CHARSET,
            timezone: process.env.TIMEZONE,
            typeCast: (field, next) => {
                if (field.type == 'DATETIME') {
                    return moment.utc(field.string(), 'YYYY-MM-DD HH:mm:ss').format();
                } else if (field.type == 'TIMESTAMP') {
                    return moment.utc(field.string(), 'YYYY-MM-DD HH:mm:ss').format();
                } else if (field.type == 'DATE') {
                    return moment.utc(field.string(), 'YYYY-MM-DD').format('YYYY-MM-DD');
                }

                return next();
            },
        },
    },

    production: {
        client: 'mysql2',
        connection: {
            host: process.env.DATABASE_HOST_IP,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASS,
            database: process.env.TEST_DATABASE_NAME,
            charset: process.env.DATABASE_CHARSET,
            timezone: process.env.TIMEZONE,
            typeCast: (field, next) => {
                if (field.type == 'DATETIME') {
                    return moment(field.string()).format('YYYY-MM-DD HH:mm:ss');
                } else if (field.type == 'TIMESTAMP') {
                    return moment(field.string()).format('YYYY-MM-DD HH:mm:ss');
                }
            },
        },
    },
};
