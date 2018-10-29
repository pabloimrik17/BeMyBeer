import * as mysql2Imported from 'mysql2/promise';
import { ConnectionOptions } from 'mysql2/promise';
import 'reflect-metadata';
import { container } from '../../../api/ioc/ioc';
import { ClassTypes } from '../../../api/ioc/types';
import Database, { defaultConnectionOptions } from '../../../api/shared/Database';
import SpyInstance = jest.SpyInstance;

const dotenv = require('dotenv');
dotenv.config();

jest.mock('mysql2/promise');

let database: Database;

describe('Category', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    test('Expect object to be instantiated properly', () => {
      database = new Database(mysql2Imported);
      database = container.get<Database>(ClassTypes.Database);

      expect(database).toBeTruthy();
      expect(database.Pool).toBe(undefined);
    });
  });

  describe('Connect', () => {
    test('Expect connect to set pool property with a new connection and set the mode (environment)', async () => {
      const connectionOptions: ConnectionOptions = Object.assign({}, defaultConnectionOptions, { database: process.env.TEST_DATABASE_NAME });
      const connection = { config: {}, threadId: 1 };
      const createConnectionMocked: SpyInstance = jest.spyOn(mysql2Imported, 'createConnection').mockImplementation(() => {
        return new Promise(resolve => resolve(connection));
      });

      database = new Database(mysql2Imported);
      await database.connect();

      expect(createConnectionMocked).toBeCalledTimes(1);
      expect(createConnectionMocked).toBeCalledWith(connectionOptions);
      expect(database.Pool).toBe(connection);
    });
  });
});