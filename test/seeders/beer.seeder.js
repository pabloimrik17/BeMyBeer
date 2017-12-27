const { faker, knex, _ } = require('../common.test');

const ObjectSeeder = require('./object.seeder');
const Beer = require('../../api/models/beer.model');
const Category = require("../../api/models/category.model");

const _MIN_OBJECTS_TO_GENERATE_ = 10;
const _MAX_OBJECTS_TO_GENERATE_ = 50;

class BeerSeeder extends ObjectSeeder {

    static generateBeerObject(beerObject) {
        const newBeerData = BeerSeeder.generateBeerData();

        _.forOwn(newBeerData, (key, value) => {
            beerObject[value] = key;
        });
    }

     static async generateBeerData(maxIdParentId = 0) {
        const categoryRow = await knex(Category.getTableName).select(Category.getPrimaryKey).orderByRaw('rand()').limit(1);

        return {
            name: faker.name.firstName(),
            graduation: faker.random.number({ min: 2, max: 20, precision: 2}),
            color: faker.internet.color(),
            score: faker.random.number({ min: 0, max: 100 }),
            price: faker.random.number({ min: 0, max: 30, precision: 2 }),
            idCategory: categoryRow[0].idCategory,
            datePurchased: faker.date.past(),
            dateDrinked: faker.date.future(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.future(),
        };
    }

    static async upData() {
        const numberOfDataToInsert = faker.random.number({ min: _MIN_OBJECTS_TO_GENERATE_, max: _MAX_OBJECTS_TO_GENERATE_ });
        const dataToInsert = [];

        try {
            for (let i = 0; i < numberOfDataToInsert; i += 1) {
                dataToInsert.push(BeerSeeder.generateBeerData(numberOfDataToInsert));
            }

            await knex(Beer.getTableName).insert(dataToInsert);
        } catch (e) {
            console.log(e);
        }
    }

    static async downData() {
        try {
            await knex(Beer.getTableName).truncate();
        } catch (e) {
            console.log(e);
        }
    }
}
