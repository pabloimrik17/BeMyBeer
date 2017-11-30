require('dotenv').config();
const db = require('../api/shared/dbObject');

db.connect(process.env.CURRENT_ENVIROMENT, () => {});

const chai = require('chai');
const expect = chai.expect;


exports.expect = expect;
exports.db = db;
