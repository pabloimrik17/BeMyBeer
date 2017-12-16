// https://stackoverflow.com/questions/24153261/joining-tests-from-multiple-files-with-mocha-js

function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}

const common = require("./common.test");

describe("top", () => {
    before(async () => {
        await common.knex.migrate.rollback({env: 'development'});
        await common.knex.migrate.latest({env: 'development'});
    });

    beforeEach(() => {
        console.log("running something before each test");
    });
    importTest("Category Class", './models/category.class.test');
    after(async () => {
        await common.knex.migrate.rollback({env: 'development'});
        await common.knex.migrate.latest({env: 'development'});
    });
});