// https://stackoverflow.com/questions/24153261/joining-tests-from-multiple-files-with-mocha-js

function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}

const common = require('./common.test');

setTimeout(() => {
    describe('MODEL TEST SUITE', function() {
        before(async function() {
            await common.knex.migrate.rollback({ env: 'development' });
            await common.knex.migrate.latest({ env: 'development' });
        });

        importTest('Category Class', './models/category.class.test');

        after(async function() {
            await common.knex.migrate.rollback({ env: 'development' });
            await common.knex.migrate.latest({ env: 'development' });
        });
    });
    run();
}, 5000);
