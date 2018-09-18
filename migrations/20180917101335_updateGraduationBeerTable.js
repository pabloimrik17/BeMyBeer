exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('beer', (table) => {
            table.decimal('graduation', 10.2).notNull().alter()
        })
    ])
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('beer', (table) => {
            table.decimal('graduation', 2.2).notNull().alter()
        })
    ])
};
