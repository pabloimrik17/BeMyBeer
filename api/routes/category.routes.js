const express = require('express');
const { checkIdParam, checkBody, validationResult } = require('../middleware/routes.middleware');
const { _ } = require('../shared/common.api');
const schemas = require('../schemas/category.schema');
const Category = require('../models/category.model');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const category = new Category();
        const categories = await category.getAll();
        res.json({ data: JSON.stringify(categories) });
    } catch (e) {
        res.json({ data: JSON.stringify(e) });
    }
});

router.get('/:id', checkIdParam(), async (req, res) => {
    try {
        validationResult(req).throw();

        const idCategory = req.params.id;
        const category = new Category(idCategory);
        await category._init();

        res.json({ data: JSON.stringify(category) });
    } catch (e) {
        console.log(e);
        res.json({ data: JSON.stringify(e) });
    }
});

router.post('/', checkBody(schemas.createCategory), async (req, res) => {
    try {
        const category = new Category();

        _.forEach(req.body, (value, key) => {
            category[key] = value;
        });

        await category.save();

        res.json({ message: 'TODO MENSAJE OK', data: JSON.stringify(category) });
    } catch (e) {
        res.json(`TODO RESPONSE FAIL ${e}`);
    }
});

router.put('/:id', checkIdParam(), checkBody(schemas.updateCategory), async (req, res) => {
    try {
        validationResult(req).throw();

        const idCategory = req.params.id;
        const category = new Category(idCategory);

        _.forEach(req.body, (value, key) => {
            category[key] = value;
        });

        await category.update();

        res.json({ message: 'TODO MENSAJE OK', data: JSON.stringify(category) });
    } catch (e) {
        res.json(`TODO RESPONSE FAIL ${e}`);
    }
});

router.delete('/:id', checkIdParam(), async (req, res) => {
    try {
        validationResult(req).throw();

        const idCategory = req.params.id;
        const category = new Category(idCategory);
        await category.delete();

        res.json({ data: 'OK' });
    } catch (e) {
        res.json({ data: JSON.stringify(e) });
    }
});

module.exports = router;
