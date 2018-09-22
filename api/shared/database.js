// https://www.terlici.com/2015/08/13/mysql-node-express.html

require('dotenv').config();

const { moment } = require('./common.api');

const mysql = require('mysql2/promise');

exports.MODE_TEST = process.env.TEST_ENVIROMENT;
exports.MODE_PRODUCTION = process.env.PRO_ENVIROMENT;

const state = {
    pool: null,
    mode: null,
};

exports.connect = async (mode) => {
    state.pool = await mysql.createConnection({
        host: process.env.DATABASE_HOST_IP,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
        database: mode === exports.MODE_PRODUCTION
            ? process.env.PROD_DATABASE_NAME
            : process.env.TEST_DATABASE_NAME,
        connectTimeout: 3000,
        timezone: process.env.TIMEZONE,
        typeCast: (field, next) => {
            if (field.type === 'DATETIME') {
                return moment.utc(field.string(), 'YYYY-MM-DD HH:mm:ss').format();
            } else if (field.type === 'TIMESTAMP') {
                return moment.utc(field.string(), 'YYYY-MM-DD HH:mm:ss').format();
            } else if (field.type === 'DATE') {
                return moment.utc(field.string(), 'YYYY-MM-DD').format('YYYY-MM-DD');
            }

            return next();
        },
    });
    state.mode = mode;
};

exports.get = () => state.pool;
