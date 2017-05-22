var dataBaseModel  = require("./../dbModel/database");

var userModel = {};

userModel.getUser = function(id, cb) {
    if (dataBaseModel) {
        var query = "SELECT *" +
                    "FROM user" +
                    "WHERE id = ?";
        dataBaseModel.query(query, id, function(error, result) {
            if(error) {
                cb(1012, "Error al obtener el usuariO");
            }
            else {
                cb(null, result);
            }
        });
    }
};

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = userModel;