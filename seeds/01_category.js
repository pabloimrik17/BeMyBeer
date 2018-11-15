const faker = require('faker');
const moment = require('moment');

faker.seed(parseInt(moment.utc().toString(), 10));

const numberOfItems = 10;

const percentageMinOfItemsWithParents = 0.2;
const percentageMaxOfItemsWithParents = 0.4;

const minNumberOfItemsWithParents = Math.ceil(numberOfItems * percentageMinOfItemsWithParents);
const maxNumberOfItemsWithParents = Math.floor(numberOfItems * percentageMaxOfItemsWithParents);
const numberOfItemsWithParents = faker.random.number({
    min: minNumberOfItemsWithParents,
    max: maxNumberOfItemsWithParents
});

const seed = async function seed(knex) {
    await knex('beer').update({idCategory: null}).whereNotNull('idCategory');
    await knex('category').update({idParent: null}).whereNotNull('idParent');
    await knex('category').del();

    const initialCategories = new Array(maxNumberOfItemsWithParents).fill(null).map(item => {
        return {
            name: faker.commerce.productName(),
            idParent: null,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        }
    });

    await knex('category').insert(initialCategories);

    const categoriesWithParent = [];
    for (let i = 0; i < numberOfItemsWithParents; i++) {
        const [{idCategory}] = await knex('category').select('idCategory').limit(1).orderByRaw('RAND()');
        categoriesWithParent.push({
            name: faker.commerce.productName(),
            idParent: idCategory,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        });
    }

    await knex('category').insert(categoriesWithParent)

    const remainingNumberOfItemsToCreate = numberOfItems - (maxNumberOfItemsWithParents + numberOfItemsWithParents);
    const remainingCategories = new Array(remainingNumberOfItemsToCreate).fill(null).map(item => {
        return {
            name: faker.commerce.productName(),
            idParent: null,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        }
    });

    await knex('category').insert(remainingCategories)
};

module.exports.seed = seed;