'use strict';

const express = require('express');
const router = express.Router();

router.use('/', (req, res) => {
    res.json({message: "hello beerworld!"})
});

module.exports = router;
