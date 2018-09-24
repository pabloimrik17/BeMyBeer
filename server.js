require('dotenv').config();

const express = require('express');
const Sentry = require('@sentry/node') ;
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const db = require('./api/shared/database');
const routes = require('./api/routes/routes');


async function main() {
    const app = express();

    Sentry.init({ dsn:'https://7100e575340f4b24b6b1e45618c0e805@sentry.io/1284650' });
    app.use(Sentry.Handlers.requestHandler());
    app.use(Sentry.Handlers.errorHandler());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(expressValidator());
    app.use(process.env.API_ENTRY_POINT, routes);



    const port = process.env.PORT || 3000;

    try {
        await db.connect(process.env.CURRENT_ENVIROMENT);

        // SERVER RUN
        app.listen(port, () => {
            console.log(`App listeting on http://localhost:${port}`);
        });
    } catch (e) {
        console.error(e);
    }
}

main();
