/**
 * Created by Etherless-Nxzt on 24/12/2016.
 */
//https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
//https://scotch.io/tutorials/route-middleware-to-check-if-a-user-is-authenticated-in-node-js

var express = require('express');
var router = express.Router();
var categoryModel = require("../models/categoryModel");

router.get("/getCategory/:id", function(req, res) {
    var idCategory = req.params.id;

    categoryModel.getCategory(idCategory, function(err, result) {
        if(!err) {
            res.json(result);
        } else {
            res
                .status(400)
                .json({err : err, description: result})
        }
    })
});

router.get("/getAllCategories", function(req, res) {
    categoryModel.getAllCategories(function(err, result) {
        if(!err) {
            res.json(result);
        } else {
            res
                .status(400)
                .json({err : err, description: result})
        }
    })
});

router.get("/getCategoriesByParent/:idParent", function(req, res) {
    var idParent = req.params.idParent;

    categoryModel.getCategoriesByParent(idParent, function(err, result) {
        if(!err) {
            res.json(result);
        } else {
            res
                .status(400)
                .json({err : err, description: result})
        }
    })
});

router.get("/getRootCategories", function(req, res) {

    categoryModel.getRootCategories(function(err, result) {
        if(!err) {
            console.log(result);
            res.json(result);
        } else {
            res
                .status(400)
                .json({err : err, description: result})
        }
    })
});

router.post("/insertCategory", function(req, res) {
    var categoryData = {
        name : req.body.name,
        idParent : req.body.idParent
    };

    categoryModel.insertCategory(categoryData, function(err, result) {
        if(!err) {
            console.log(result);
            res.json(result);
        } else {
            res
                .status(400)
                .json({err : err, description: result})
        }
    })
});

router.put("/updateCategory/:idCategory", function(req, res) {
    var categoryData = {
        name : req.body.name,
        idParent : req.body.idParent
    };
    var idCategory = req.params.idCategory;

    categoryModel.updateCategory(idCategory, categoryData, function(err, result) {
        if(!err) {
            res.json(result);
        } else {
            res
                .status(400)
                .json({err : err, description: result})
        }
    })
});

router.delete("/deleteCategory/:idCategory", function(req, res) {
    var idCategory = req.params.idCategory;

    categoryModel.deleteCategory(idCategory, function(err, result) {
        if(!err) {
            res.json(result);
        } else {
            res
                .status(400)
                .json({err : err, description: result})
        }
    })
});

module.exports = router;
