
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTableIfNotExists('category', (table) => {
          table.increments("id_category");
          table.string("name").unique();
          table.integer("id_parent").default(0);
          table.timestamps();
      })
  ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('category')
    ]);
};
