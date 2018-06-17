const express = require('express');

const router = express.Router();

// ROUTES
const categoryRoutes = require('./category.routes');
const beerRoutes = require('./beer.routes');

router.use('/categories', categoryRoutes);
router.use('/beers', beerRoutes);

module.exports = router;
