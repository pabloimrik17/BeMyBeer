var dataBaseModel  = require("../../config/database");

var beerModel = {};


beerModel.getBeer = function(id, cb) {
    if(dataBaseModel) {
        var query = "SELECT b.*, c.name as categoryName " +
                    "FROM beer b " +
                    "LEFT JOIN category c ON b.idCategory = c.id " +
                    "WHERE b.id = ?";
        dataBaseModel.query(query, [id], function(err, result) {
            if(err) {
                console.log(query, err);
                cb(1006, "Error al obtener la cerveza");
            } else {
                console.log(id);
                cb(null, result);
            }
        });
    }
};

beerModel.getAllBeers = function(cb) {
    if(dataBaseModel) {
        var query = "SELECT b.*, c.name as categoryName " +
                    "FROM beer b " +
                    "LEFT JOIN category c ON b.idCategory = c.id ";

        dataBaseModel.query(query, function(err, result) {
            if(err) {
                console.log(query, err)
                cb(1007, "Error al obtener todas las cervezas");
            } else {
                cb(null, result);
            }
        });
    }
};

beerModel.getBeersByCategory = function(idCategory, cb) {
    if(dataBaseModel) {
        var query = "SELECT b.*, c.name as categoryName " +
                    "FROM beer b " +
                    "LEFT JOIN category c ON b.idCategory = c.id " +
                    "WHERE b.idCategory = ?";
        dataBaseModel.query(query, [idCategory], function(err, result) {
            if(err) {
                cb(1008, "Error al obtener todas las cervezas por categoria");
            } else {
                cb(null, result);
            }
        });
    }
};

beerModel.insertBeer = function(beerData, cb) {
    if(dataBaseModel) {
        var query = "INSERT INTO beer set ?";
        dataBaseModel.query(query, beerData, function(err, result) {
            if(err) {
                cb(1009, "Error al insertar la cerveza");
            } else {
                cb(null, result.insertId);
            }
        });
    }
};

beerModel.updateBeer = function(idBeer, beerData, cb) {
    if(dataBaseModel) {
        var query = "UPDATE beer " +
                    "SET name = ?, " +
                    "idCategory = ?, " +
                    "graduation = ? " +
                    "WHERE id = ? ";
        var values = [beerData.name, beerData.idCategory, beerData.graduation, idBeer];
        dataBaseModel.query(query, values, function(err, result) {
            if(err) {
                cb(1010, "Error al actualizar la cerveza");
            } else {
                cb(null, result);
            }
        });
    }
};

beerModel.deleteBeer = function(idBeer, cb) {
    if(dataBaseModel) {
        var query = "DELETE FROM beer" +
                    "WHERE id = ?";
        dataBaseModel.query(query, idBeer, function(err, result) {
            if(err) {
                cb(1011, "Error al borrar la cerveza");
            } else {
                cb(null, result);
            }
        });
    }
};

module.exports = beerModel;