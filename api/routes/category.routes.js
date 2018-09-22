const express = require('express');
const { checkIdParam, checkBody, validationResult } = require('../middleware/routes.middleware');
const { ObjectResponser } = require('../shared/common.api');
const schemas = require('../schemas/category.schema');
const Category = require('../models/category.model');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const categories = await Category.getAll();
        ObjectResponser.responseSuccess(res, categories);
    } catch (error) {
        ObjectResponser.responseError(res, error);
    }
});

router.get('/:id', checkIdParam(), async (req, res) => {
    const idCategory = parseInt(req.params.id);

    try {
        validationResult(req).throw();
        const category = new Category(idCategory);
        await category.get();

        ObjectResponser.responseSuccess(res, category);
    } catch (error) {
        ObjectResponser.responseError(res, error);
    }
});

router.post('/', checkBody(schemas.createCategory), async (req, res) => {
    try {
        const category = new Category();
        category.init(req.body);
        await category.save();

        ObjectResponser.responseSuccess(res, category);
    } catch (error) {
        ObjectResponser.responseError(res, error);
    }
});

router.put('/:id', checkIdParam(), checkBody(schemas.updateCategory), async (req, res) => {
    try {
        validationResult(req).throw();

        const idCategory = parseInt(req.params.id);
        const category = new Category(idCategory);

        await category.update(req.body);

        ObjectResponser.responseSuccess(res, category);
    } catch (error) {
        ObjectResponser.responseError(res, error);
    }
});

router.delete('/:id', checkIdParam(), async (req, res) => {
    const idCategory = parseInt(req.params.id);

    try {
        validationResult(req).throw();
        const category = new Category(idCategory);
        await category.delete();

        ObjectResponser.responseSuccess(res);
    } catch (error) {
        ObjectResponser.responseError(res, error);
    }
});

module.exports = router;
