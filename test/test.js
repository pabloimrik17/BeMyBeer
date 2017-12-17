// https://stackoverflow.com/questions/24153261/joining-tests-from-multiple-files-with-mocha-js

function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}

const { knex, expect } = require('./common.test');

describe('MODEL TEST SUITE', async function () {
    this.timeout(20000);

    before(async function () {

        try {
            await knex.migrate.rollback({env: 'development'});
            await knex.migrate.latest({env: 'development'});
        } catch (e) {
            expect(e).to.be.empty;
        }
    });

    importTest('Category Class', './models/category.class.test');

    after(async function () {
        try {
            await knex.migrate.rollback({env: 'development'});
            await knex.migrate.latest({env: 'development'});
        } catch (e) {
            expect(e).to.be.empty;
        }
    });
});
