// https://github.com/facebook/jest/tree/master/examples/manual-mocks

const Database = jest.fn().mockImplementation(() => {
    return {};
});

export default Database;