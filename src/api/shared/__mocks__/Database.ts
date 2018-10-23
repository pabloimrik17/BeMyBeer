// https://github.com/facebook/jest/tree/master/examples/manual-mocks

const Database = jest.fn().mockImplementation(() => {
  return {};
});

Object.defineProperty(Database, 'Pool', {
  get: jest.fn(() => 'hola'),
  set: jest.fn(),
});


export default Database;