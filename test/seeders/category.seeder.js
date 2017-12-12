'use strict';

const ObjectSeeder = require('./object.seeder');
const Category = require('../../api/models/category.model');

const _definition = {
    primaryKey: Category.primaryKey,
    tableName: Category.tableName,
    dbProperties: Category.dbProperties,
};

class CategorySeeder extends ObjectSeeder {

    static get getPrimaryKey() {
        return _definition.primaryKey;
    }

    static get getTableName() {
        return _definition.tableName;
    }

    static get getDbProperties() {
        return _definition.dbProperties;
    }

    static async up() {
        try {
            return await _testDb.schema.createTableIfNotExists(Category, (table) => {
                table.increments("id_category");
                table.string('name');
                table.timestamps();
            });
        } catch (e) {
            console.log(e);
        }
    }

}

module.exports = CategorySeeder;