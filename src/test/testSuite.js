// https://stackoverflow.com/questions/24153261/joining-tests-from-multiple-files-with-mocha-js

const { knex, expect } = require('./common.test');
const UtilTest = require('./shared/UtilTest.class');
const path = require('path');

describe ('Test Suite', () => {
    console.log(path.join(__dirname, './unitTestSuite'));
    UtilTest.importTest('Unit Test Suite', path.join(__dirname, './unitTestSuite'))
});

/*describe('MODEL TEST SUITE', async function () {
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
});*/
