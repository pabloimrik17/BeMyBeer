import 'reflect-metadata';
import Database from '../../../api/shared/Database';

jest.mock('mysql2/promise');

let database: Database;

describe('Category', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    test('Expect object to be instantiated properly', () => {
      database = new Database();

      expect(database).toBeTruthy();
      expect(database.Pool).toBe(undefined);
    });
  });
});