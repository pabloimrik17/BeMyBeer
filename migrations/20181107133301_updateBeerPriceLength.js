exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('beer', (table) => {
            table.float('price', 4.2).notNull().default(0).alter()
        })
    ])
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('beer', (table) => {
            table.decimal('price', 2.2).notNull().alter()
        })
    ])
};
