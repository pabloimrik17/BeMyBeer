const express = require('express');
// ROUTES
const categoryRoutes = require('./category.routes');
const beerRoutes = require('./beer.routes');

const router = express.Router();

router.use('/category', categoryRoutes);
router.use('/beer', beerRoutes);

module.exports = router;
