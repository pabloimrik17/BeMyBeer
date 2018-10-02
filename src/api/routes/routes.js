const express = require('express');

const router = express.Router();

// ROUTES
const categoryRoutes = require('./category.routes');
const beerRoutes = require('./beer.routes');

router.use('/category', categoryRoutes);
router.use('/beer', beerRoutes);

module.exports = router;
