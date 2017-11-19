'use strict';

const express = require('express');
const router = express.Router();

// ROUTES
const beerRoutes = require('./beer.routes');

router.use('/beers', beerRoutes);

module.exports = router;