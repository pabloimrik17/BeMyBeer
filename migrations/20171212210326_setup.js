
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('category', (table) => {
          table.increments("idCategory");
          table.string("name").default('');
          table.integer("idParent").default(0);
          table.timestamp('createdAt').notNull().default('000-00-00 00:00:00');
          table.timestamp('updatedAt').notNull().default('000-00-00 00:00:00');
      })
  ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('category')
    ]);
};
