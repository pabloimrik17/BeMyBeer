// https://blog.risingstack.com/getting-node-js-testing-and-tdd-right-node-js-at-scale/

const _testDb = require('../db/database.test');

class ObjectSeeder {

    async up() {
        try {
            return await _testDb.schema.createTableIfNotExists("category2", (table) => {
                table.increments("id_category");
                table.string('name');
                table.timestamps();
            });
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = ObjectSeeder;