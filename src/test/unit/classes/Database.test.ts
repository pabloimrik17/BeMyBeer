import * as mysql2Imported from 'mysql2/promise';
import { ConnectionOptions } from 'mysql2/promise';
import 'reflect-metadata';
import { container } from '../../../api/ioc/ioc';
import { classTypes } from '../../../api/ioc/types';
import Database, { defaultConnectionOptions } from '../../../api/shared/Database';
import SpyInstance = jest.SpyInstance;

jest.mock('mysql2/promise');

let database: Database;

describe('Database', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    test('Expect object to be instantiated properly', () => {
      database = container.get<Database>(classTypes.Database);

      expect(database).toBeTruthy();
      expect(database.Pool).toBe(undefined);
    });
  });

  describe('DatabaseConnectionOption', () => {
    test('Expect to return test database when environment is test', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = process.env.TEST_ENV;
      const databaseConnectionOption: ConnectionOptions = Database.databaseConnectionOption();

      expect(databaseConnectionOption.database).toBeTruthy();
      expect(databaseConnectionOption.database).toBe(process.env.TEST_DATABASE_NAME);

      process.env.NODE_ENV = originalEnv;
    });

    test('Expect to return dev database when environment is dev', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = process.env.DEV_ENV;
      const databaseConnectionOption: ConnectionOptions = Database.databaseConnectionOption();

      expect(databaseConnectionOption.database).toBeTruthy();
      expect(databaseConnectionOption.database).toBe(process.env.DEV_DATABASE_NAME);

      process.env.NODE_ENV = originalEnv;
    });

    test('Expect to return prod database when environment is prod', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = process.env.PROD_ENV;
      const databaseConnectionOption: ConnectionOptions = Database.databaseConnectionOption();

      expect(databaseConnectionOption.database).toBeTruthy();
      expect(databaseConnectionOption.database).toBe(process.env.PROD_DATABASE_NAME);

      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('Connect', () => {
    test('Expect connect to set pool property with a new connection', async () => {
      const connectionOptions: ConnectionOptions = Object.assign(
        {}, defaultConnectionOptions, Database.databaseConnectionOption(),
      );
      const connection = { config: {}, threadId: 1 };
      const createConnectionMocked: SpyInstance = jest.spyOn(mysql2Imported, 'createConnection')
        .mockImplementation(() => {
          return new Promise(resolve => resolve(connection));
        });

      database = container.get<Database>(classTypes.Database);
      await database.connect();

      expect(createConnectionMocked).toBeCalledTimes(1);
      expect(createConnectionMocked).toBeCalledWith(connectionOptions);
      expect(database.Pool).toBe(connection);
    });

    test('Expect connect to test database when enviroment is test', async () => {
      const originalEnv: string = process.env.NODE_ENV;
      process.env.NODE_ENV = process.env.TEST_ENV;

      const connectionOptions: ConnectionOptions = Object.assign(
        {}, defaultConnectionOptions, Database.databaseConnectionOption(),
      );
      const connection = { config: {}, threadId: 1 };
      const createConnectionMocked: SpyInstance = jest.spyOn(mysql2Imported, 'createConnection')
        .mockImplementation(() => {
          return new Promise(resolve => resolve(connection));
        });

      database = container.get<Database>(classTypes.Database);
      await database.connect();

      expect(createConnectionMocked).toBeCalledTimes(1);
      expect(createConnectionMocked).toBeCalledWith(connectionOptions);
      expect(createConnectionMocked.mock.calls[0][0]['database']).toBe(process.env.TEST_DATABASE_NAME);

      process.env.NODE_ENV = originalEnv;
    });

    test('Expect connect to dev database when enviroment is dev', async () => {
      const originalEnv: string = process.env.NODE_ENV;
      process.env.NODE_ENV = process.env.DEV_ENV;

      const connectionOptions: ConnectionOptions = Object.assign(
        {}, defaultConnectionOptions, Database.databaseConnectionOption(),
      );
      const connection = { config: {}, threadId: 1 };
      const createConnectionMocked: SpyInstance = jest.spyOn(mysql2Imported, 'createConnection')
        .mockImplementation(() => {
          return new Promise(resolve => resolve(connection));
        });

      database = container.get<Database>(classTypes.Database);
      await database.connect();

      expect(createConnectionMocked).toBeCalledTimes(1);
      expect(createConnectionMocked).toBeCalledWith(connectionOptions);
      expect(createConnectionMocked.mock.calls[0][0]['database']).toBe(process.env.DEV_DATABASE_NAME);

      process.env.NODE_ENV = originalEnv;
    });

    test('Expect connect to prod database when enviroment is prod', async () => {
      const originalEnv: string = process.env.NODE_ENV;
      process.env.NODE_ENV = process.env.PROD_ENV;

      const connectionOptions: ConnectionOptions = Object.assign(
        {}, defaultConnectionOptions, Database.databaseConnectionOption(),
      );
      const connection = { config: {}, threadId: 1 };
      const createConnectionMocked: SpyInstance = jest.spyOn(mysql2Imported, 'createConnection')
        .mockImplementation(() => {
          return new Promise(resolve => resolve(connection));
        });

      database = container.get<Database>(classTypes.Database);
      await database.connect();

      expect(createConnectionMocked).toBeCalledTimes(1);
      expect(createConnectionMocked).toBeCalledWith(connectionOptions);
      expect(createConnectionMocked.mock.calls[0][0]['database']).toBe(process.env.PROD_DATABASE_NAME);

      process.env.NODE_ENV = originalEnv;
    });
  });
});
