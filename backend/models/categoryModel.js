var dataBaseModel  = require("../../config/database");

var categoryModel = {};

categoryModel.getCategory = function(id, cb) {
    if(dataBaseModel) {
        var query = "SELECT * " +
                    "FROM category " +
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

categoryModel.getAllCategories = function(cb) {
    if(dataBaseModel) {
        var query = "SELECT * " +
                    "FROM category ";
        dataBaseModel.query(query, function(err, result) {
            if(err) {
                cb(1001, "Error al obtener todas las categorias");
            } else {
                cb(null, result);
            }
        });
    }
};

categoryModel.getCategoriesByParent = function(idCategoryParent, cb) {
    if(dataBaseModel) {
        var query = "SELECT * " +
                    "FROM category " +
                    "WHERE idParent = ?";
        dataBaseModel.query(query, idCategoryParent, function(err, result) {
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
        var query = "INSERT INTO category " +
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

categoryModel.updateCategory = function(idCategory, categoryData, cb) {
    if(idCategory == 1) {
        cb(1006, "Error, no se puede modificar la categoria root");
    } else {
        if (dataBaseModel) {
            var query = "UPDATE category " +
                "SET name = ?, " +
                "idParent = ? " +
                "WHERE Id = ? ";
            var values = [categoryData.name, categoryData.idParent, idCategory];
            dataBaseModel.query(query, values, function (err, result) {
                if (err) {
                    cb(1004, "Error al actualizar la categoria");
                } else {
                    cb(null, result);
                }
            });
        }
    }
};

categoryModel.deleteCategory = function(idCategory, cb) {
    if(dataBaseModel) {
        var query = "DELETE FROM category " +
                    "WHERE id = ?";
        console.log(idCategory);
        dataBaseModel.query(query,[idCategory], function(err, result) {
            if(err) {
                cb(1005, "Error al borrar la categoria");
            } else {
                cb(null, result);
            }
        });
    }
};

module.exports = categoryModel;