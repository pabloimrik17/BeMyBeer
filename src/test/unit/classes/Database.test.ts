import * as knexImported from 'knex';
import * as momentImported from 'moment';
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
      database = new Database(mysql2Imported, knexImported, momentImported);
      database = container.get<Database>(ClassTypes.Database);

      expect(database).toBeTruthy();
      expect(database.Pool).toBe(undefined);
    });
  });

  describe('databaseConnectionOption', () => {
    test('Expect to return test database when environment is test', () => {
      const originalEnv: string = process.env.CURRENT_ENVIROMENT;
      process.env.CURRENT_ENVIROMENT = process.env.TEST_ENVIROMENT;

      const databaseConnectionOption: ConnectionOptions = Database.databaseConnectionOption();

      expect(databaseConnectionOption.database).toBeTruthy();
      expect(databaseConnectionOption.database).toBe(process.env.TEST_DATABASE_NAME);

      process.env.CURRENT_ENVIROMENT = originalEnv;
    });

    test('Expect to return prod database when environment is prod', () => {
      const originalEnv: string = process.env.CURRENT_ENVIROMENT;
      process.env.CURRENT_ENVIROMENT = process.env.PROD_ENVIROMENT;

      const databaseConnectionOption: ConnectionOptions = Database.databaseConnectionOption();

      expect(databaseConnectionOption.database).toBeTruthy();
      expect(databaseConnectionOption.database).toBe(process.env.PROD_DATABASE_NAME);

      process.env.CURRENT_ENVIROMENT = originalEnv;
    });
  });

  describe('Connect', () => {
    test('Expect connect to set pool property with a new connection', async () => {
      const connectionOptions: ConnectionOptions = Object.assign({}, defaultConnectionOptions, Database.databaseConnectionOption());
      const connection = { config: {}, threadId: 1 };
      const createConnectionMocked: SpyInstance = jest.spyOn(mysql2Imported, 'createConnection').mockImplementation(() => {
        return new Promise(resolve => resolve(connection));
      });

      database = new Database(mysql2Imported, knexImported, momentImported);
      await database.connect();

      expect(createConnectionMocked).toBeCalledTimes(1);
      expect(createConnectionMocked).toBeCalledWith(connectionOptions);
      expect(database.Pool).toBe(connection);
    });

    test('Expect connect to test database when enviroment is test', async () => {
      const originalEnv: string = process.env.CURRENT_ENVIROMENT;
      process.env.CURRENT_ENVIROMENT = process.env.TEST_ENVIROMENT;

      const connectionOptions: ConnectionOptions = Object.assign({}, defaultConnectionOptions, Database.databaseConnectionOption());
      const connection = { config: {}, threadId: 1 };
      const createConnectionMocked: SpyInstance = jest.spyOn(mysql2Imported, 'createConnection').mockImplementation(() => {
        return new Promise(resolve => resolve(connection));
      });

      database = new Database(mysql2Imported, knexImported, momentImported);
      await database.connect();

      expect(createConnectionMocked).toBeCalledTimes(1);
      expect(createConnectionMocked).toBeCalledWith(connectionOptions);
      expect(createConnectionMocked.mock.calls[0][0]['database']).toBe(process.env.TEST_DATABASE_NAME);

      process.env.CURRENT_ENVIROMENT = originalEnv;
    });

    test('Expect connect to prod database when enviroment is prod', async () => {
      const originalEnv: string = process.env.CURRENT_ENVIROMENT;
      process.env.CURRENT_ENVIROMENT = process.env.PROD_ENVIROMENT;

      const connectionOptions: ConnectionOptions = Object.assign({}, defaultConnectionOptions, Database.databaseConnectionOption());
      const connection = { config: {}, threadId: 1 };
      const createConnectionMocked: SpyInstance = jest.spyOn(mysql2Imported, 'createConnection').mockImplementation(() => {
        return new Promise(resolve => resolve(connection));
      });

      database = new Database(mysql2Imported, knexImported, momentImported);
      await database.connect();

      expect(createConnectionMocked).toBeCalledTimes(1);
      expect(createConnectionMocked).toBeCalledWith(connectionOptions);
      expect(createConnectionMocked.mock.calls[0][0]['database']).toBe(process.env.PROD_DATABASE_NAME);

      process.env.CURRENT_ENVIROMENT = originalEnv;
    });
  });
});