const {faker, knex, _} = require('../common.test');

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

    static get getTableName () {
        return _definition.tableName;
    }

    static generateCategoryObject (categoryObject) {
        const newCategoryData = CategorySeeder.generateCategoryData();

        _.forOwn(newCategoryData, (key, value) => {
            categoryObject[value] = key;
        });
    }

    static generateCategoryData (maxIdParentId = 0) {
        return {
            name: faker.name.firstName(),
            idParent: faker.random.number({min: 0, max: maxIdParentId}),
            createdAt: faker.date.past(),
            updatedAt: faker.date.future(),
        };
    }

    static async upData () {
        await super.upData();
        const numberOfDataToInsert = faker.random.number({
            min: _MIN_OBJECTS_TO_GENERATE_,
            max: _MAX_OBJECTS_TO_GENERATE_
        });
        const dataToInsert = [];

        try {
            for (let i = 0; i < numberOfDataToInsert; i += 1) {
                dataToInsert.push(CategorySeeder.generateCategoryData(numberOfDataToInsert));
            }

            await knex(Category.getTableName).insert(dataToInsert);
        } catch (e) {
            console.log(e);
            throw new Error();
        }
    }

    static async downData () {
        await super.downData();

        try {
            await knex(CategorySeeder.getTableName).truncate();
        } catch (e) {
            console.log(e);
            throw new Error();
        }
    }
}

module.exports = CategorySeeder;
