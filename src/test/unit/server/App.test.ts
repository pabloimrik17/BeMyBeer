import bodyParser from 'body-parser';
import express, { Express } from 'express';
import { decorate, injectable } from 'inversify';
import { container } from '../../../api/ioc/ioc';
import { classTypes, npmTypes } from '../../../api/ioc/types';
import { apiErrors } from '../../../api/shared/apiResponser/ApiErrors';
import Database from '../../../api/shared/Database';
import EnviromentVariableHandler from '../../../api/shared/EnviromentVariableHandler';
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

const originalEnv = { ...process.env };

describe('App', () => {
  beforeEach(() => {
    container.snapshot();
    jest.clearAllMocks();
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    container.restore();
  });

  describe('Constructor', () => {
    test('Expect object to be instantiated', () => {
      const app: App = container.get<App>(classTypes.App);

      expect(app.app).toBe(container.get<Express>(npmTypes.Express));
      expect(app.app.use).toHaveBeenNthCalledWith(1, bodyParser.json());
      expect(app.app.use).toHaveBeenNthCalledWith(2, bodyParser.urlencoded(App.urlEncodedConfig));
      expect(Database).toBeCalledTimes(1);
    });
  });

  describe('Run', () => {
    test('Expect database connection up and server listening if not on test env', async () => {
      const database: Database = container.get<Database>(classTypes.Database);
      const app: App = container.get<App>(classTypes.App);

      await app.run();

      expect(database.connect).toBeCalledTimes(1);
      expect(app.app.listen).toBeCalledTimes(0);
    });

    test('Expect database connection up and server listening if not on test env', async () => {
      process.env.NODE_ENV = process.env.DEV_ENV;
      const database: Database = container.get<Database>(classTypes.Database);
      const app: App = container.get<App>(classTypes.App);

      await app.run();

      expect(database.connect).toBeCalledTimes(1);
      expect(app.app.listen).toBeCalledTimes(1);
      expect(app.app.listen).toBeCalledWith(parseInt(process.env.DEV_SERVER_PORT, 10));
    });

    test('Expect to connect to default port if no environment variable for current env', async () => {
      process.env.NODE_ENV = process.env.DEV_ENV;
      jest.spyOn(EnviromentVariableHandler, 'getVariableByEnvironment').mockReturnValueOnce(undefined);

      const app: App = container.get<App>(classTypes.App);
      await app.run();

      expect(app.app.listen).toBeCalledTimes(1);
      expect(app.app.listen).toBeCalledWith(3000);
    });

    test('Expect to throw if exception happens on connection', async () => {
      container.unbind(classTypes.Database);
      const connectMock = jest.fn(() => new Promise((resolve, reject) => reject(undefined)));
      const databaseMock = {
        connect: connectMock,
      };

      container.bind<Partial<Database>>(classTypes.Database).toConstantValue(databaseMock);

      const app: App = container.get<App>(classTypes.App);

      await expect(app.run())
        .rejects
        .toThrowError(apiErrors.APP.RUN.message);
    });
  });

  describe('Stop', () => {
    test('Expect to daaptabase and server go offline', async () => {
      container.unbind(classTypes.Database);
      const disconnectMock = jest.fn();
      const databaseMock = {
        connect: jest.fn(),
        disconnect: disconnectMock,
      };

      container.unbind(npmTypes.Express);
      const closeMock = jest.fn();
      const serverMock = {
        close: closeMock,
      };
      const listenMock = jest.fn(() => serverMock);
      const expressMock = {
        listen: listenMock,
        use: jest.fn(),
      };

      container.bind<Partial<Database>>(classTypes.Database).toConstantValue(databaseMock);
      container.bind<Partial<Express>>(npmTypes.Express).toConstantValue(expressMock);
      process.env.NODE_ENV = process.env.DEV_ENV;

      const app: App = container.get<App>(classTypes.App);
      await app.run();
      await app.stop();

      expect(disconnectMock).toBeCalledTimes(1);
      expect(closeMock).toBeCalledTimes(1);
    });

    test('Expect to throw error if stops in executed when server is not running', async () => {
      const app: App = container.get<App>(classTypes.App);

      await expect(app.stop())
        .rejects
        .toThrowError('TODO');
    });

    test('Expect to throw error if server is running on test environment cause no listen function executed', async () => {
      process.env.NODE_ENV = process.env.DEV_ENV;

      const app: App = container.get<App>(classTypes.App);
      await app.run();

      await expect(app.stop())
        .rejects
        .toThrowError('TODO');
    });
  });
});
