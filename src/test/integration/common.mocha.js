

require('dotenv').config({ path: '../../.env' });

const knexConfig = require('../../../knexfile');
const Knex = require('knex');
// TODO QUITAR STRING FIJO
const knex = Knex(knexConfig.development);

const database = require('../../api/shared/Database');

const chai = require('chai');
const faker = require('faker/locale/es');
const moment = require('moment');
const _ = require('lodash');

database.connect(process.env.TEST_ENVIROMENT);

const expect = chai.expect;
chai.use(require('chai-date-string'));

exports.knex = knex;
exports.expect = expect;
exports.faker = faker;
exports.moment = moment;
exports._ = _;
exports.database = database;
