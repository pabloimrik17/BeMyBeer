'use strict';

const express = require('express');
const router = express.Router();
const {checkIdParam, checkBody} = require('../middleware/routes.middleware');
const schemas = require('../schemas/category.schema');
const Category = require('../models/category.model');

router.get('/', async (req, res) => {
    try {
        const categories = await Category.getAll();
        res.json({data: JSON.stringify(categories)});
    } catch(e) {
        res.json({data: JSON.stringify(e)});
    }
});

router.get('/:id', checkIdParam(), async (req, res) => {
    const idCategory = req.params.id;

    try {
        validationResult(req).throw();
        const category = await Category.getOne(idCategory);
        res.json({data: JSON.stringify(category)});
    } catch(e) {
        console.log(e);
        res.json({data: JSON.stringify(e)});
    }
});

router.post('/', checkBody(schemas.createCategory), async (req, res) => {
    try {
        console.log(req.body.name);
        res.json("Ok");
    } catch(e) {
        res.json("Not ok");
    }
});

router.put('/:id', async (req, res) => {

});

router.delete('/:id', async (req, res) => {
    const idCategory = req.params.id;

    try {
        await Category.deleteOne(idCategory);
        res.json({data: "OK"});
    } catch(e) {
        res.json({data: JSON.stringify(e)});
    }

});

function checkId() {

}

module.exports = router;
