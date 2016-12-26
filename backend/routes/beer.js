/**
 * Created by Etherless-Nxzt on 24/12/2016.
 */
var express = require('express');
var router = express.Router();
var beerModel = require("../models/beerModel");

router.get("/getAllBeers", function(req, res) {
    beerModel.getAllBeers(function(err, result) {
        if(!err) {
            res.json(result);
        } else {
            res
                .status(400)
                .json({err : err, description: result})
        }
    })
});

router.get("/getBeer/:id", function(req, res) {
    var idBeer = req.params.id;

    beerModel.getBeer(idBeer, function(err, result) {
        if(!err) {
            res.json(result);
        } else {
            res
                .status(400)
                .json({err : err, description: result})
        }
    })
});

router.get("/getBeersByCategory/:idCategory", function(req, res) {
    var idCategory = req.params.idCategory;

    beerModel.getBeersByCategory(idCategory, function(err, result) {
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
