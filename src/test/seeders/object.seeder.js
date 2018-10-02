// https://blog.risingstack.com/getting-node-js-testing-and-tdd-right-node-js-at-scale/
const {knex} = require('../common.test');

class ObjectSeeder {

    static async upData() {
        try {
            await knex.raw('SET FOREIGN_KEY_CHECKS = 1');
        } catch (e) {
            throw new Error();
        }
    }

    static async downData() {
        try {
            await knex.raw('SET FOREIGN_KEY_CHECKS = 0');
        } catch (e) {
            throw new Error();
        }
    }
}

module.exports = ObjectSeeder;