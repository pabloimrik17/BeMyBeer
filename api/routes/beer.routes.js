const express = require('express');
const { checkIdParam, checkBody, validationResult } = require('../middleware/routes.middleware');
const { ObjectResponser } = require('../shared/common.api');
const schemas = require('../schemas/beer.schema');
const Beer = require('../models/beer.model');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const beers = await new Beer().getAll();
        ObjectResponser.responseSuccess(res, beers);
    } catch (error) {
        ObjectResponser.responseError(res, error);
    }
});

router.get('/:id', checkIdParam(), async (req, res) => {
    const idBeer = parseInt(req.params.id);

    try {
        validationResult(req).throw();
        const beer = new Beer(idBeer);
        await beer.get();

        ObjectResponser.responseSuccess(res, beer);
    } catch (error) {
        ObjectResponser.responseError(res, error);
    }
});

router.post('/', checkBody(schemas.createBeer), async (req, res) => {
    try {
        const beer = new Beer();
        beer.init(req.body);
        await beer.save();

        ObjectResponser.responseSuccess(res, beer);
    } catch (error) {
        ObjectResponser.responseError(res, error);
    }
});

router.put('/:id', checkIdParam(), checkBody(schemas.updateBeer), async (req, res) => {
    try {
        validationResult(req).throw();

        const idBeer = parseInt(req.params.id);
        const beer = new Beer(idBeer);

        // beer.init(req.body);
        await beer.update(req.body);

        ObjectResponser.responseSuccess(res, beer);
    } catch (error) {
        ObjectResponser.responseError(res, error);
    }
});

module.exports = router;
