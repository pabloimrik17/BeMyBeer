/**
 * Created by Etherless-Nxzt on 25/12/2016.
 */


var express = require('express');
var router = express.Router();
var userModel = require("./login");

router.get("/login", function (req, res) {
    res.render("backoffice/noAuth/login/login")
});

router.get("/beers", function (req, res) {
    res.render("backoffice/auth/beerList/beerList");
});

router.get("/beerEdition", function (req, res) {
    res.render("backoffice/auth/beerEdition/beerEdition")
});

router.get("/categories", function (req, res) {
    res.render("backoffice/auth/categoryList/categoryList")
});

router.get("/categoryEdition", function (req, res) {
    res.render("backoffice/auth/categoryEdition/categoryEdition")
});


module.exports = router;

