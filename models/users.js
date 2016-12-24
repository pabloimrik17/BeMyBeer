var dataBaseModel  = require("./database");

var userModel = {};

//obtenemos todos los usuarios
userModel.getUsers = function(callback) {
    if (dataBaseModel) {
        dataBaseModel.query('SELECT * FROM user ORDER BY id', function(error, rows) {
            if(error) {
                callback(1000)
            }
            else {
                callback(null, rows);
            }
        });
    }
};

userModel.getUser = function(id,callback) {
    if (dataBaseModel) {
        var sql = 'SELECT * FROM user WHERE id = ?';
        dataBaseModel.query(sql, id, function(error, row) {
            if(error) {
                throw error;
            }
            else {
                callback(null, row);
            }
        });
    }
}

//añadir un nuevo usuario
userModel.insertUser = function(userData,callback) {
    if (dataBaseModel) {
        dataBaseModel.query('INSERT INTO users SET ?', userData, function(error, result) {
            if(error) {
                throw error;
            }
            else {
                //devolvemos la última id insertada
                callback(null,{"insertId" : result.insertId});
            }
        });
    }
}

//actualizar un usuario
userModel.updateUser = function(userData, callback) {
    if(dataBaseModel) {
        var sql = 'UPDATE users SET username = ? ,' +
            'email = ?email '+
            'WHERE id = ?';

        var values = [userData.username, userData.email, userData.id];
        dataBaseModel.query(sql, values, function(error, result) {
            if(error) {
                throw error;
            }
            else {
                callback(null,{"msg":"success"});
            }
        });
    }
}

//eliminar un usuario pasando la id a eliminar
userModel.deleteUser = function(id, callback) {
    if(dataBaseModel) {
        var sqlExists = 'SELECT * FROM users WHERE id = ?';
        dataBaseModel.query(sqlExists, id, function(err, row) {
            //si existe la id del usuario a eliminar
            if(row) {
                var sql = 'DELETE FROM users WHERE id = ?';
                dataBaseModel.query(sql, id, function(error, result) {
                    if(error) {
                        throw error;
                    }
                    else {
                        callback(null,{"msg":"deleted"});
                    }
                });
            }
            else {
                callback(null,{"msg":"notExist"});
            }
        });
    }
};

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = userModel;