// https://github.com/facebook/jest/tree/master/examples/manual-mocks

const Database = jest.fn().mockImplementation(() => {
    return {
        Pool: {
            query: jest.fn((sql: string, values: [Object, number]) => true),
        },
    };
});

export default Database;