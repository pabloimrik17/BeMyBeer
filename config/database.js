var mysql = require('mysql');

var dataBaseModel = {};

dataBaseModel = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bemybeer'
    }
);

dataBaseModel.connect(function(err){
    if(err){
        console.log('No se pudo conectar con la base de datos');
        return;
    }
    console.log('Conexión establecida con la base de datos');
});

module.exports = dataBaseModel;
