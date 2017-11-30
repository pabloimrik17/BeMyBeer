// https://stackoverflow.com/questions/24153261/joining-tests-from-multiple-files-with-mocha-js

function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}

var common = require("./common");

describe("top", function () {
    beforeEach(function () {
        console.log("running something before each test");
    });
    importTest("Category Class", './models/category.class.test');
    after(function () {
        console.log("after all tests");
    });
});