require('dotenv').config();

const db = require('../api/db/dbObject');
const chai = require('chai');
const faker = require('faker/locale/es');
const moment = require('moment');

const expect = chai.expect;
chai.use(require('chai-date-string'));

db.connect(process.env.CURRENT_ENVIROMENT, () => {
    exports.db = db;

    exports.expect = expect;
    exports.faker = faker;
    exports.moment = moment;
});



