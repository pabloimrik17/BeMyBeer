const faker = require('faker');
const moment = require('moment');

faker.seed(parseInt(moment.utc().toString(), 10));

const numberOfItems = 30;

const percentageMinOfItemsWithCategory = 0.8;
const percentageMaxOfItemsWithCategory = 0.95;

const minNumberOfItemsWithCategory = Math.ceil(numberOfItems * percentageMinOfItemsWithCategory);
const maxNumberOfItemsWithCategory = Math.floor(numberOfItems * percentageMaxOfItemsWithCategory);
const numberOfItemsWithCategory = faker.random.number({
    min: minNumberOfItemsWithCategory,
    max: maxNumberOfItemsWithCategory
});

const seed = async function seed(knex) {
    await knex('beer').update({idCategory: null}).whereNotNull('idCategory');
    await knex('beer').del();

    const beersWithCategory = [];
    for (let i = 0; i < numberOfItemsWithCategory; i++) {
        const [{idCategory}] = await knex('category').select('idCategory').limit(1).orderByRaw('RAND()');
        beersWithCategory.push({
            name: faker.commerce.productName(),
            graduation: faker.random.number({min: 0, max: 12, precision: 2}),
            color: '#7D7D7D', // TODO FAKER RANDOM HEXA
            score: faker.random.number(),
            price: faker.random.number({min: 0, max: 12, precision: 2}),
            idCategory: idCategory,
            datePurchased: moment().format('YYYY-MM-DD HH:mm:ss'),
            dateDrinked: moment().format('YYYY-MM-DD HH:mm:ss'),
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        });
    }

    await knex('beer').insert(beersWithCategory);

    const remainingNumberOfItemsToCreate = numberOfItems - numberOfItemsWithCategory;

    const remainingBeers = new Array(remainingNumberOfItemsToCreate).fill(null).map(item => {
        return {
            name: faker.commerce.productName(),
            graduation: faker.random.number({min: 0, max: 12, precision: 2}),
            color: '#7D7D7D', // TODO FAKER RANDOM HEXA
            score: faker.random.number(),
            price: faker.random.number({min: 0, max: 12, precision: 2}),
            idCategory: null,
            datePurchased: moment().format('YYYY-MM-DD HH:mm:ss'),
            dateDrinked: moment().format('YYYY-MM-DD HH:mm:ss'),
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        }
    });

    await knex('beer').insert(remainingBeers)
};

module.exports.seed = seed;