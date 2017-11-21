'use strict';

require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(process.env.API_ENTRY_POINT, require('./api/routes/routes'));

const port = process.env.PORT || 3000;
// SERVER RUN
app.listen(port, () => {
    console.log(`App listeting on http://localhost:${port}`)
});