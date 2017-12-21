
exports.up = (knex, Promise) => Promise.all([
    knex.schema.createTable('beer', (table) => {
        table.increments('idBeer');
        table.string('name').default('').unique();
        table.integer('idCategory').index('idCategory');
        table.foreign('idCategory', 'beer_idCategory_category').references('category.idCategory');
    }),
]);

exports.down = (knex, Promise) => Promise.all([
    knex.schema.dropTable('beer'),
]);
