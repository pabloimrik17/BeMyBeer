'use strict';

require('dotenv').config({path: '../../.env'});

const Knex = require('knex');

const knex = Knex({
    client: 'mysql2',
    connection: {
        host : process.env.DATABASE_HOST_IP,
        user : process.env.DATABASE_USER,
        password : process.env.DATABASE_PASS,
        database : process.env.TEST_DATABASE_NAME
    }
});

module.exports = knex;

