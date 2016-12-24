var mysql = require('mysql');

var dataBaseModel = {};

dataBaseModel = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_users'
    }
);

module.exports = dataBaseModel;
