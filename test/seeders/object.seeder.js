// https://blog.risingstack.com/getting-node-js-testing-and-tdd-right-node-js-at-scale/

const { database } = require('../common.test');

class ObjectSeeder {

    static async upData() {
        const sql = `
            SET FOREIGN_KEY_CHECKS = 1
         `;

        try {
            await database.get().query(sql);
        } catch (e) {
            throw new Error();
        }
    }

    static async downData() {
        const sql = `
            SET FOREIGN_KEY_CHECKS = 0
         `;

        try {
            await database.get().query(sql);
        } catch (e) {
            throw new Error();
        }
    }
}

module.exports = ObjectSeeder;