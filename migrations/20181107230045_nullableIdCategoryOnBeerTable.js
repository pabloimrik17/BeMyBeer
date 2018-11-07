exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('beer', (table) => {
            table.dropForeign(['idCategory'], 'beer_idCategory_category');
            table.dropIndex(['idCategory'], 'idCategory');
            table.integer('idCategory').unsigned().nullable().index('idCategory').alter();
            table.foreign('idCategory', 'beer_idCategory_category').references('category.idCategory');
        })
    ]);
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('beer', (table) => {
            table.dropForeign(['idCategory'], 'beer_idCategory_category');
            table.dropIndex(['idCategory'], 'idCategory');
            table.integer('idCategory').unsigned().notNull().alter();
            table.foreign('idCategory', 'beer_idCategory_category').references('category.idCategory');
        })
    ]);
};
