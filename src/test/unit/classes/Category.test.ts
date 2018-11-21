import { decorate, injectable } from 'inversify';
import 'reflect-metadata';
import Category from '../../../api/classes/Category';
import { container } from '../../../api/ioc/ioc';
import { classTypes } from '../../../api/ioc/types';
import { apiErrors } from '../../../api/shared/apiResponser/ApiErrors';
import Database from '../../../api/shared/Database';

decorate(injectable(), Database);
jest.mock('../../../api/shared/Database');

const originalEnv = { ...process.env };

describe('Category', () => {
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
    test('Expect object to be instantiated properly', () => {
      const category = container.get<Category>(classTypes.Category);

      expect(category).toBeTruthy();
      expect(category.name).toBe('');
      expect(category.idParent).toBe(0);
    });

    test('Expect idCategory to be 0 when no id supplied in constructor', () => {
      const category = container.get<Category>(classTypes.Category);

      expect(category.Id).toBe(0);
    });

    test('Expect idCategory to be 0 when 0 value supplied in constructor', () => {
      const category = container.get<Category>(classTypes.Category);
      category.Id = 0;

      expect(category.Id).toBe(0);
    });

    test('Expect idCategory to be equal to value greater than 0 supplied in constructor', () => {
      const category = container.get<Category>(classTypes.Category);
      category.Id = 2;

      expect(category.Id).toBe(2);
    });
  });

  describe('Delete', () => {
    test('Expectt to delete to throw error because no valid id', async () => {
      const category = container.get<Category>(classTypes.Category);
      category.Id = Number.NaN;

      await expect(category.delete())
        .rejects
        .toThrowError(apiErrors.CATEGORY.DELETE_NO_VALID_ID.message);
    });

    test('Expectt to delete to throw error because query error', async () => {
      container.unbind(classTypes.Database);
      const database = {};
      const mockedQuery = jest.fn(() => new Promise((resolve, reject) => reject(undefined)));
      Object.defineProperty(database, 'Pool', {
        get: jest.fn(() => ({ query: mockedQuery })),
        set: jest.fn(),
      });

      container.bind<Partial<Database>>(classTypes.Database).toConstantValue(database);

      const category = container.get<Category>(classTypes.Category);
      category.Id = 1;

      await expect(category.delete())
        .rejects
        .toThrowError('CATEGORY DELETE QUERY TODO');
    });
  });
});
