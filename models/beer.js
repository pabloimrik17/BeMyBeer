var dataBaseModel  = require("./database");

var beerModel = {};

beerModel.getBeer = function(id, cb) {
    if(dataBaseModel) {
        var query = "SELECT * " +
                    "FROM beer " +
                    "where id = ?";
        dataBaseModel.query(query, id, function(err, result) {
            if(err) {
                cb(1006, "Error al obtener la cerveza");
            } else {
                cb(null, result);
            }
        });
    }
};

beerModel.getAllBeers = function(id, cb) {
    if(dataBaseModel) {
        var query = "SELECT * " +
                    "FROM beer";
        dataBaseModel.query(query, function(err, result) {
            if(err) {
                cb(1007, "Error al obtener todas las cervezas");
            } else {
                cb(null, result);
            }
        });
    }
};

beerModel.getBeersByCategory = function(idCategory, cb) {
    if(dataBaseModel) {
        var query = "SELECT * " +
                    "FROM beer " +
                    "WHERE category = ?";
        dataBaseModel.query(query, idCategory, function(err, result) {
            if(err) {
                cb(1008, "Error al obtener todas las cervezas por categoria");
            } else {
                cb(null, result);
            }
        });
    }
};

beerModel.insertBeer = function(categoryData, cb) {
    if(dataBaseModel) {
        var query = "INSERT INTO beer set ?";
        dataBaseModel.query(query, categoryData, function(err, result) {
            if(err) {
                cb(1009, "Error al insertar la cerveza");
            } else {
                cb(null, result);
            }
        });
    }
};

beerModel.updateBeer = function(categoryData, cb) {
    if(dataBaseModel) {
        var query = "UPDATE beer " +
            "SET name = ?, " +
            "idParent = ?";
        var values = [categoryData.name, categoryData.idParent];
        dataBaseModel.query(query, values, function(err, result) {
            if(err) {
                cb(1010, "Error al actualizar la cerveza");
            } else {
                cb(null, result);
            }
        });
    }
};

beerModel.deleteBeer = function(id, cb) {
    if(dataBaseModel) {
        var query = "DELETE FROM beer" +
                    "WHERE id = ?";
        dataBaseModel.query(query, id, function(err, result) {
            if(err) {
                cb(1011, "Error al borrar la cerveza");
            } else {
                cb(null, result);
            }
        });
    }
};

module.exports = beerModel;