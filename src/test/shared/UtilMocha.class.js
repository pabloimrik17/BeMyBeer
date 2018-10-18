
class UtilTest {
    static importTest (name, path) {
        describe(name, () => {
            require(path)
        });
    }
}

module.exports = UtilTest;