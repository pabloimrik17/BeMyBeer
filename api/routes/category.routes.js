'use strict';

const express = require('express');
const router = express.Router();

const Category = require('../models/category.model');
let category = new Category();

router.get('/', async (req, res) => {
    try {
        const categories = await category.getAll();
        res.json({data: JSON.stringify(categories)});
    } catch(e) {
        res.json({data: JSON.stringify(e)});
    }
});

router.get('/:id', async (req, res) => {
    const idCategory = req.params.id;
    try {
        await category.getOne(idCategory);
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

});

module.exports = router;
