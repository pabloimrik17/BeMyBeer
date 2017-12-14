'use strict';

const {faker, knex, moment} = require('../common');

const ObjectSeeder = require('./object.seeder');
const Category = require('../../api/models/category.model');

const _definition = {
    primaryKey: Category.getPrimaryKey,
    tableName: Category.getTableName,
    dbProperties: Category.getDbProperties,
};

const _MIN_OBJECTS_TO_GENERATE_ = 10;
const _MAX_OBJECTS_TO_GENERATE_ = 50;

class CategorySeeder extends ObjectSeeder {

    static get getTableName() {
        return _definition.tableName;
    }

    static generateCategoryObject() {
        const category = new Category();

        const newCategoryData = CategorySeeder.generateCategoryData();

        _.forOwn(newCategoryData, (key, value) => {
            category[key] = value;
        });

        return category;
    }

    static generateCategoryData(maxIdParentId = 0) {

        const objectData = {
            name: faker.name.firstName(),
            idParent: faker.random.number({min:0, max:maxIdParentId}),
            createdAt: moment(faker.date.past()).format('YYYY-MM-DD'),
            updatedAt: moment(faker.date.future()).format('YYYY-MM-DD'),
        };

        return objectData;
    }

    static async upData() {
        const numberOfDataToInsert = faker.random.number({min: _MIN_OBJECTS_TO_GENERATE_, max: _MAX_OBJECTS_TO_GENERATE_});
        let dataToInsert = [];

        try {
            for(let i = 0; i < numberOfDataToInsert; i++) {
                dataToInsert.push(CategorySeeder.generateCategoryData(numberOfDataToInsert));
            }

            await knex(Category.getTableName).insert(dataToInsert);
        } catch(e) {
            console.log(e);
        }
    }

    static async downData() {
        try {
            await knex(CategorySeeder.getTableName).truncate();
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = CategorySeeder;