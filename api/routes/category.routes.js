'use strict';

const express = require('express');
const router = express.Router();

const Category = require('../models/category.model');

router.get('/', async (req, res) => {
    try {
        const categories = await Category.getAll();
        res.json({data: JSON.stringify(categories)});
    } catch(e) {
        res.json({data: JSON.stringify(e)});
    }
});

router.get('/:id', async (req, res) => {
    const idCategory = req.params.id;

    try {
        const category = await Category.getOne(idCategory);
        res.json({data: JSON.stringify(category)});
    } catch(e) {
        res.json({data: JSON.stringify(e)});
    }
});

router.post('/', async (req, res) => {

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

module.exports = router;
