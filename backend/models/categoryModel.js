var dataBaseModel  = require("./../dbModel/database");

var categoryModel = {};

categoryModel.getCategory = function(id, cb) {
    if(dataBaseModel) {
        var query = "SELECT * " +
                    "FROM categoryList " +
                    "WHERE id = ?";
        dataBaseModel.query(query, id, function(err, result) {
            if(err) {
                cb(1000, "Error al obtener la categoria");
            } else {
                cb(null, result);
            }
        });
    }
};

categoryModel.getAllCategories = function(id, cb) {
    if(dataBaseModel) {
        var query = "SELECT * " +
                    "FROM categoryList";
        dataBaseModel.query(query, function(err, result) {
            if(err) {
                cb(1001, "Error al obtener todas las categorias");
            } else {
                cb(null, result);
            }
        });
    }
};

categoryModel.getCategoriesByParent = function(idParent, cb) {
    if(dataBaseModel) {
        var query = "SELECT * " +
                    "FROM categoryList " +
                    "WHERE idParent = ?";
        dataBaseModel.query(query, idParent, function(err, result) {
            if(err) {
                cb(1002, "Error al obtener todas las categorias por padre");
            } else {
                cb(null, result);
            }
        });
    }
};



categoryModel.insertCategory = function(categoryData, cb) {
    if(dataBaseModel) {
        var query = "INSERT INTO categoryList " +
                    "SET ?";
        dataBaseModel.query(query, categoryData, function(err, result) {
            if(err) {
                cb(1003, "Error al insertar la categoria");
            } else {
                cb(null, result);
            }
        });
    }
};

categoryModel.updateCategory = function(categoryData, cb) {
    if(dataBaseModel) {
        var query = "UPDATE categoryList " +
                    "SET name = ?, " +
                    "idParent = ?";
        var values = [categoryData.name, categoryData.idParent];
        dataBaseModel.query(query, values, function(err, result) {
            if(err) {
                cb(1004, "Error al actualizar la categoria");
            } else {
                cb(null, result);
            }
        });
    }
};

categoryModel.deleteCategory = function(id, cb) {
    if(dataBaseModel) {
        var query = "DELETE FROM categoryList" +
                    "WHERE id = ?";
        dataBaseModel.query(query, id, function(err, result) {
            if(err) {
                cb(1005, "Error al borrar la categoria");
            } else {
                cb(null, result);
            }
        });
    }
};

module.exports = categoryModel;