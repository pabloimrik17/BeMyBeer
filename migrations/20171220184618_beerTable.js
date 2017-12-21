
exports.up = (knex, Promise) => Promise.all([
    knex.schema.createTable('beer', (table) => {
        table.increments('idBeer');
        table.string('name').unique().notNull();
        table.decimal('graduation', 2).notNull();
        table.string('color').default('FFF').notNull();
        table.integer('score').default(0).notNull();
        table.decimal('price', 2).default(0).notNull();
        table.integer('idCategory').unsigned().notNull().index('idCategory');
        table.foreign('idCategory', 'beer_idCategory_category').references('category.idCategory');
        table.date('datePurchased').notNull();
        table.date('dateDrinked').nullable();
        table.timestamp('createdAt').notNull();
        table.timestamp('updatedAt').notNull();
    }),
    knex.schema.alterTable('category', (table) => {
        table.timestamp('createdAt').notNull().alter();
        table.timestamp('updatedAt').notNull().alter();
    }),
]);

exports.down = (knex, Promise) => Promise.all([
    knex.schema.dropTable('beer'),
    knex.schema.alterTable('category', (table) => {
        table.timestamp('createdAt').notNull().default('000-00-00 00:00:00').alter();
        table.timestamp('updatedAt').notNull().default('000-00-00 00:00:00').alter();
    }),
]);
