// https://www.terlici.com/2015/08/13/mysql-node-express.html

'use strict';

require("dotenv").config();

const mysql = require('mysql2/promise');
const async = require('async');

exports.MODE_TEST = process.env.TEST_ENVIROMENT;
exports.MODE_PRODUCTION = process.env.PRO_ENVIROMENT;

let state = {
    pool: null,
    mode: null,
};

exports.connect = function (mode, done) {
    state.pool = mysql.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
        database: mode === exports.MODE_PRODUCTION ? process.env.PROD_DATABASE_NAME : process.env.TEST_DATABASE_NAME
    });

    state.mode = mode;
    done()
};

exports.get = function () {
    return state.pool
};

exports.fixtures = function (data) {
    const pool = state.pool;
    if (!pool) return done(new Error('Missing database connection.'));

    let names = Object.keys(data.tables)
    async.each(names, function (name, cb) {
        async.each(data.tables[name], function (row, cb) {
            let keys = Object.keys(row)
                , values = keys.map(function (key) {
                return "'" + row[key] + "'"
            });

            pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
        }, cb)
    }, done)
};

exports.drop = function (tables, done) {
    const pool = state.pool;
    if (!pool) return done(new Error('Missing database connection.'));

    async.each(tables, function (name, cb) {
        pool.query('DELETE * FROM ' + name, cb)
    }, done)
};