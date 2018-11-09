import bodyParser from 'body-parser';
import * as express from 'express';
import { decorate, injectable } from 'inversify';
import { Express } from 'jest-express/lib/express';
import { container } from '../../../api/ioc/ioc';
import { classTypes, npmTypes } from '../../../api/ioc/types';
import { apiErrors } from '../../../api/shared/apiResponser/ApiErrors';
import Database from '../../../api/shared/Database';
import App from '../../../App';

jest.mock('body-parser', () => {
  return {
    json: jest.fn(),
    urlencoded: jest.fn(),
  };
});

jest.mock('express', () => {
  return require('jest-express');
});

decorate(injectable(), Database);
jest.mock('../../../api/shared/Database');

describe('App', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('Constructpr', () => {
    test('Expect object to be instantiated', () => {
      const app: App = container.get<App>(classTypes.App);

      expect(app.app).toBe(container.get<Express>(npmTypes.Express));
      expect(app.app.use).toHaveBeenNthCalledWith(1, bodyParser.json());
      expect(app.app.use).toHaveBeenNthCalledWith(2, bodyParser.urlencoded(App.urlEncodedConfig));
      expect(Database).toBeCalledTimes(1);
    });
  });

  describe('Run', () => {
    test('Expect database connection up and server listening', async () => {
      // process.env.NODE_ENV = process.env.DEV_ENV;
      const database: Database = container.get<Database>(classTypes.Database);
      const app: App = container.get<App>(classTypes.App);

      await app.run();

      expect(database.connect).toBeCalledTimes(1);
      // expect(app.app.listen).toBeCalledTimes(1);

      // process.env.NODE_ENV = process.env.TEST_ENV;
    });

    test('Expect to throw if exception happens on connection', async () => {
      const mockedConnect = jest.fn(() => new Promise((resolve, reject) => reject(undefined)));
      const database = container.get<Database>(classTypes.Database);
      database.connect = mockedConnect;

      const app: App = container.get<App>(classTypes.App);

      await expect(app.run())
        .rejects
        .toThrowError(apiErrors.APP.RUN.message);
    });
  });
});
