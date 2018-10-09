const express = require('express');
const { checkIdParam, checkBody, validationResult } = require('../middleware/routes.middleware');
const { ObjectResponser } = require('../shared/common.api');
const schemas = require('../schemas/category.schema');
const Category = require('../classes/category.model');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const categories = await new Category().getAll();
        ObjectResponser.responseSuccess(res, categories);
    } catch (error) {
        ObjectResponser.responseError(res, error);
    }
});

router.get('/:id', checkIdParam(), async (req, res) => {
    const idCategory = parseInt(req.params.id, 10);

    try {
        validationResult(req).throw();
        const category = new Category(idCategory);
        const categoryResponse = await category.getFiltered();

        ObjectResponser.responseSuccess(res, categoryResponse);
    } catch (error) {
        ObjectResponser.responseError(res, error);
    }
});

router.post('/', checkBody(schemas.createCategory), async (req, res) => {
    try {
        validationResult(req).throw();

        const category = new Category();
        category.init(req.body);
        const categoryResponse = await category.saveAndRetrieveFiltered();

        ObjectResponser.responseSuccess(res, categoryResponse);
    } catch (error) {
        ObjectResponser.responseError(res, error);
    }
});

router.put('/:id', checkIdParam(), checkBody(schemas.updateCategory), async (req, res) => {
    try {
        validationResult(req).throw();
        const idCategory = parseInt(req.params.id, 10);

        const category = new Category(idCategory);
        const categoryResponse = await category.updateAndRetrieveFiltered(req.body);

        ObjectResponser.responseSuccess(res, categoryResponse);
    } catch (error) {
        ObjectResponser.responseError(res, error);
    }
});

router.delete('/:id', checkIdParam(), async (req, res) => {
    const idCategory = parseInt(req.params.id, 10);

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
