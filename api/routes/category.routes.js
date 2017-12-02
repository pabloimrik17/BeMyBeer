'use strict';

const express = require('express');
const router = express.Router();

const Category = require('../models/category.model');

router.get('/', async (req, res) => {
    const category = new Category();
    try {
        const categories = await category.getAll();
        res.json({data: JSON.stringify(categories)});
    } catch(e) {
        res.json({data: JSON.stringify(e)});
    }
});

router.get('/:id', async (req, res) => {
    const idCategory = req.params.id;
    const category = new Category(idCategory);
    try {
        await category.getOne();
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
