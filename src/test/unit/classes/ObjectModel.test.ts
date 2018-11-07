import * as importedMoment from 'moment';
import * as mysql2Imported from 'mysql2/promise';
import { Connection } from 'mysql2/promise';
import DateModel from '../../../api/classes/DateModel';
import ObjectModel from '../../../api/classes/ObjectModel';
import { apiErrors } from '../../../api/shared/apiResponser/ApiErrors';
import Database from '../../../api/shared/Database';
import SpyInstance = jest.SpyInstance;

jest.mock('../../../api/shared/Database');
jest.mock('../../../api/classes/DateModel');

let database: Database;
let dateModel: DateModel;
let mockedQuery: SpyInstance = undefined;

const mockedSelectReturnedRows: Object[] = [<Object>{}, <Object>{}];
const mockedSelectQueryReturn = [mockedSelectReturnedRows, []];
const insertId: number = 1;
const mockedInsertResult: Object = { insertId };
const mockedInsertQueryReturn: any[] = [mockedInsertResult, []];

describe('Object Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    database = database = new Database(mysql2Imported, importedMoment);
    mockedQuery = jest.fn<Connection>((sql: string) => new Promise(resolve => resolve(mockedSelectQueryReturn)));
    Object.defineProperty(database, 'Pool', {
      get: jest.fn(() => ({ query: mockedQuery })),
      set: jest.fn(),
    });

    dateModel = new DateModel(importedMoment);
  });

  describe('Constructor', () => {
    test('Expect object to be instantiated', () => {
      const objectModel: ObjectModel = new ObjectModel();

      expect(DateModel).toBeCalledTimes(1);
      expect(Database).toBeCalledTimes(1);
      expect(objectModel.Id).toBe(0);
      expect(objectModel).toBeTruthy();
    });
  });

  describe('getDb', () => {
    test('Expect to return one database row', async () => {
      const idObject: number = 1;
      const objectModel: ObjectModel = new ObjectModel();
      objectModel.Database = database;
      objectModel.DateModel = dateModel;
      objectModel.Id = idObject;

      const row = await objectModel.getDb<Object>();

      expect(database.Pool.query).toBeCalledTimes(1);
      expect(typeof mockedQuery.mock.calls[0][0]).toBe('string');

      expect(row).toBeTruthy();
      expect(row).toBe(mockedSelectReturnedRows[0]);
    });

    test('Expect getDb to throw error because no id', async () => {
      const objectModel: ObjectModel = new ObjectModel();
      objectModel.Database = database;
      objectModel.DateModel = dateModel;

      mockedQuery = jest.fn(() => new Promise((resolve, reject) => reject(undefined)));

      await expect(objectModel.getDb())
        .rejects
        .toThrowError(apiErrors.OBJECT_MODEL.COMMON_NO_ID.message);
    });

    test('Expect getDb exception to be throwed', async () => {
      const idObject: number = 1;
      const objectModel: ObjectModel = new ObjectModel();
      objectModel.Database = database;
      objectModel.DateModel = dateModel;
      objectModel.Id = idObject;

      mockedQuery = jest.fn(() => new Promise((resolve, reject) => reject(undefined)));

      await expect(objectModel.getDb())
        .rejects
        .toThrowError(apiErrors.OBJECT_MODEL.GET_QUERY.message);
    });
  });

  describe('getAllDb', () => {
    test('Expect to return all database rows', async () => {
      const objectModel: ObjectModel = new ObjectModel();
      objectModel.Database = database;
      objectModel.DateModel = dateModel;
      const rows = await objectModel.getAllDb<Object>();

      expect(database.Pool.query).toBeCalledTimes(1);
      expect(typeof mockedQuery.mock.calls[0][0]).toBe('string');

      expect(rows).toBeTruthy();
      expect(rows).toBe(mockedSelectReturnedRows);
    });

    test('Expect getAllDb exception to be throwed', async () => {
      const objectModel: ObjectModel = new ObjectModel();
      objectModel.Database = database;
      objectModel.DateModel = dateModel;

      mockedQuery = jest.fn(() => new Promise((resolve, reject) => reject(undefined)));

      await expect(objectModel.getAllDb())
        .rejects
        .toThrowError(apiErrors.OBJECT_MODEL.GET_ALL_QUERY.message);
    });
  });

  describe('save', () => {
    test('Expect to save a record on database and return it', async () => {
      mockedQuery = jest.fn((sqlQuery: string, dataToInsert: {}) => {
        return new Promise(resolve => resolve(mockedInsertQueryReturn));
      });
      const objectModel: ObjectModel = new ObjectModel();
      objectModel.Database = database;
      objectModel.DateModel = dateModel;

      const dataToInsert = { name: 'name' };

      const mockedGetDbReturn = { id: 1, name: 'name' };
      objectModel.getDb = jest.fn(() => new Promise(resolve => resolve(mockedGetDbReturn)));

      const rows = await objectModel.save<Object>(dataToInsert);

      expect(database.Pool.query).toBeCalledTimes(1);
      expect(typeof mockedQuery.mock.calls[0][0]).toBe('string');
      expect(typeof mockedQuery.mock.calls[0][1]).toBe('object');
      expect(objectModel.getDb).toBeCalledTimes(1);
      expect(rows).toBeTruthy();
      expect(rows).toBe(mockedGetDbReturn);
    });

    test('Expect save exception to be throwed', async () => {
      const objectModel: ObjectModel = new ObjectModel();
      objectModel.Database = database;
      objectModel.DateModel = dateModel;

      mockedQuery = jest.fn(() => new Promise((resolve, reject) => reject(undefined)));

      await expect(objectModel.save({}))
        .rejects
        .toThrowError(apiErrors.OBJECT_MODEL.SAVE_QUERY.message);
    });
  });

  describe('update', () => {
    test('Expect to return  update a record on database and return it', async () => {
      const idObject: number = 1;
      const objectModel: ObjectModel = new ObjectModel(idObject);
      objectModel.Database = database;
      objectModel.DateModel = dateModel;

      mockedQuery = jest.fn((sqlQuery: string, values: []) => new Promise(resolve => resolve(undefined)));
      const dataToUpdate = { name: 'name' };

      const mockedGetDbReturn = { id: 1, name: 'name' };
      objectModel.getDb = jest.fn(() => new Promise(resolve => resolve(mockedGetDbReturn)));

      const rows = await objectModel.update<Object>(dataToUpdate);

      expect(database.Pool.query).toBeCalledTimes(1);
      expect(typeof mockedQuery.mock.calls[0][0]).toBe('string');
      expect(Array.isArray(mockedQuery.mock.calls[0][1])).toBe(true);
      expect(typeof mockedQuery.mock.calls[0][1][0]).toBe('object');
      expect(mockedQuery.mock.calls[0][1][1]).toBe(idObject);
      expect(objectModel.getDb).toBeCalledTimes(1);
      expect(rows).toBeTruthy();
      expect(rows).toBe(mockedGetDbReturn);
    });

    test('Expect update to throw error because no id', async () => {
      const objectModel: ObjectModel = new ObjectModel();
      objectModel.Database = database;
      objectModel.DateModel = dateModel;

      await expect(objectModel.update({}))
        .rejects
        .toThrowError(apiErrors.OBJECT_MODEL.COMMON_NO_ID.message);
    });

    test('Expect update exception to be throwed', async () => {
      const idObject: number = 1;
      const objectModel: ObjectModel = new ObjectModel(idObject);
      objectModel.Database = database;
      objectModel.DateModel = dateModel;

      mockedQuery = jest.fn(() => new Promise((resolve, reject) => reject(undefined)));

      await expect(objectModel.update({}))
        .rejects
        .toThrowError(apiErrors.OBJECT_MODEL.UPDATE_QUERY.message);
    });
  });

  describe('delete', () => {
    test('Expect to return  update a record on database and return it', async () => {
      const idObject: number = 1;
      const objectModel: ObjectModel = new ObjectModel(idObject);
      objectModel.Database = database;
      objectModel.DateModel = dateModel;

      mockedQuery = jest.fn((sqlQuery: string, values: []) => new Promise(resolve => resolve(undefined)));

      await objectModel.delete();

      expect(database.Pool.query).toBeCalledTimes(1);
      expect(typeof mockedQuery.mock.calls[0][0]).toBe('string');
      expect(mockedQuery.mock.calls[0][1][0]).toBe(idObject);
    });

    test('Expect delete to throw error because no id', async () => {
      const objectModel: ObjectModel = new ObjectModel();
      objectModel.Database = database;
      objectModel.DateModel = dateModel;

      await expect(objectModel.delete())
        .rejects
        .toThrowError(apiErrors.OBJECT_MODEL.COMMON_NO_ID.message);
    });

    test('Expect delete exception to be throwed', async () => {
      const idObject: number = 1;
      const objectModel: ObjectModel = new ObjectModel(idObject);
      objectModel.Database = database;
      objectModel.DateModel = dateModel;

      mockedQuery = jest.fn(() => new Promise((resolve, reject) => reject(undefined)));

      await expect(objectModel.delete())
        .rejects
        .toThrowError(apiErrors.OBJECT_MODEL.DELETE_QUERY.message);
    });
  });
});
