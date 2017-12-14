'use strict';

require('dotenv').config();

const express = require('express');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');

const db = require('./api/db/dbObject');
db.connect(process.env.CURRENT_ENVIROMENT);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());

app.use(process.env.API_ENTRY_POINT, require('./api/routes/routes'));

const port = process.env.PORT || 3000;
// SERVER RUN

app.listen(port, async () => {
    console.log(`App listeting on http://localhost:${port}`);
});
