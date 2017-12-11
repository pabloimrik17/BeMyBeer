'use strict';

const ObjectSeeder = require('./object.seeder');
const Category = require('../../api/models/category.model');

const _tableName = Category.dbEntity;

class CategorySeeder extends ObjectSeeder {

    constructor() {
        super();
    }

    static get getTableName() {
        return _tableName;
    }
}

module.exports = CategorySeeder;