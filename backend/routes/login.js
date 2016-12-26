var express = require('express');
var router = express.Router();
var userModel = require("./login");

/* GET users listing. */
// -> /users/
router.get('/getUsers', function(req, res, next) {
    userModel.getUsers(function(err, result) {
        if(!err) {
            res.json(result);
        } else {
            res
                .status(400)
                .json({err : err, description : "No se pudieron obtener los usuarios"});
        }
    });
});

router.get("/", function(req, res){
    res.render("list")
});

// -> /users/id
router.get('/id', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
    var body = req.body;

    userModel.insertUser(body, function(err, result) {
        if(err) {
            res
                .status(400)
                .json({err : err, description : "No se pudo insertar el usuario"});
        } else {
            res.json(result);
        }
    })
});

module.exports = router;
