const sql = '' +
    'UPDATE category c1 ' +
    'LEFT JOIN category c2 ON c1.idParent = c2.idCategory ' +
    'SET c1.idParent = NULL ' +
    'WHERE ISNULL(c2.idCategory) ' +
    '';

exports.up = (knex, Promise) => Promise.all([
    knex.schema.raw(sql),
    knex.schema.alterTable('category', (table) => {
        table.string('name', 255).nullable().defaultTo('').unique().alter();
        table.integer('idParent').unsigned().nullable().alter();
        table.index(['idParent']);
        table.foreign('idParent', 'category_idParent_category').references('category.idCategory');
    })
]);

exports.down = (knex, Promise) => Promise.all([
    knex.schema.alterTable('category', (table) => {
        table.integer('idParent').default(0).nullable().default(0).alter();
        table.string('name', 255).nullable().defaultTo('').alter();
        table.dropIndex(['idParent']);
        table.dropForeign(['idParent'], 'category_idParent_category');
    })
]);
