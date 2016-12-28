/**
 * Created by Etherless-Nxzt on 24/12/2016.
 */
var express = require('express');
var router = express.Router();
var beerModel = require("../models/beerModel");

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

router.post("/insertBeer", function(req, res) {
    var beerData = req.body.beerData;

    beerModel.insertBeer(beerData, function(err, result) {
        if(!err) {
            res.json(result);
        } else {
            res
                .status(400)
                .json({err : err, description: result})
        }
    })
});

router.put("/updateBeer/:idBeer", function(req, res) {
    var beerData = req.body.beerData;
    var idBeer = req.params.idBeer;

    beerModel.updateBeer(idBeer, beerData, function(err, result) {
        if(!err) {
            res.json(result);
        } else {
            res
                .status(400)
                .json({err : err, description: result})
        }
    })
});

router.delete("/deleteBeer/:idBeer", function(req, res) {
    var idBeer = req.params.idBeer;

    beerModel.deleteBeer(idBeer, function(err, result) {
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
