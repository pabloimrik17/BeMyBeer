import { decorate, injectable } from 'inversify';
import { Request } from 'jest-express/lib/request';
import { Response } from 'jest-express/lib/response';
import Beer from '../../../api/classes/Beer';
import BeerRoutesController from '../../../api/controllers/BeerRoutesController';
import { container } from '../../../api/ioc/ioc';
import { classTypes } from '../../../api/ioc/types';
import ApiResponser from '../../../api/shared/apiResponser/ApiResponser';
import Database from '../../../api/shared/Database';

jest.mock('express', () => {
  return require('jest-express');
});

decorate(injectable(), Beer);
decorate(injectable(), Database);
decorate(injectable(), ApiResponser);

jest.mock('../../../api/shared/Database');
jest.mock('../../../api/classes/Beer');
jest.mock('../../../api/shared/apiResponser/ApiResponser');

let req: Request = undefined;
let res: Response = undefined;

describe('Beer Routes', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    req = new Request();
    res = new Response();
  });

  describe('GET /', () => {
    test('Expect getAll and responseSuccess to be called and response the data', async () => {
      const getAllDbReturn = [{ id: 1 }, { id: 2 }];
      const mockedGetAllDb = jest.fn(() => getAllDbReturn);

      (<any>Beer).mockImplementation(() => {
        return {
          getAllDb: mockedGetAllDb,
        };
      });

      const beerRoutes: BeerRoutesController = container.get<BeerRoutesController>(classTypes.BeerRoutesController);
      await beerRoutes.getAll(req, res);

      expect(Beer).toBeCalledTimes(1);
      expect(mockedGetAllDb).toBeCalledTimes(1);
      expect(ApiResponser.responseSuccess).toBeCalledTimes(1);
      expect(ApiResponser.responseSuccess).toBeCalledWith(res, getAllDbReturn);
    });

    test('Expect getAll to throw exception and responseError to be called and response an error', async () => {
      const mockedError = new Error('MOCKED ERROR');
      const mockedGetAllDb = jest.fn(() => {
        throw mockedError;
      });

      (<any>Beer).mockImplementation(() => {
        return {
          getAllDb: mockedGetAllDb,
        };
      });

      const beerRoutes: BeerRoutesController = container.get<BeerRoutesController>(classTypes.BeerRoutesController);
      await beerRoutes.getAll(req, res);

      expect(Beer).toBeCalledTimes(1);
      expect(mockedGetAllDb).toThrowError(mockedError);
      expect(ApiResponser.responseError).toBeCalledTimes(1);
      expect(ApiResponser.responseError).toBeCalledWith(res, mockedError);
    });
  });

  describe('GET /:id', () => {
    test('Expect getById and responseSuccess to be called and response the data', async () => {
      const getDbReturn = { id: 1 };
      const mockGetDb = jest.fn(() => getDbReturn);
      const id: number = 1;

      (<any>Beer).mockImplementation(() => {
        return {
          getDb: mockGetDb,
        };
      });

      req.params = { id };

      const beerRoutes: BeerRoutesController = container.get<BeerRoutesController>(classTypes.BeerRoutesController);
      await beerRoutes.getById(req, res);

      expect(Beer).toBeCalledTimes(1);
      expect(mockGetDb).toBeCalledTimes(1);
      expect(ApiResponser.responseSuccess).toBeCalledTimes(1);
      expect(ApiResponser.responseSuccess).toBeCalledWith(res, getDbReturn);
    });

    test('Expect getById to throw error', async () => {
      const mockedError = new Error('MOCKED ERROR');
      const mockGetDb = jest.fn(() => {
        throw mockedError;
      });

      (<any>Beer).mockImplementation(() => {
        return {
          getDb: mockGetDb,
        };
      });

      const getDbSpy = jest.spyOn(container.get<Beer>(classTypes.Beer), 'getDb');

      const beerRoutes: BeerRoutesController = container.get<BeerRoutesController>(classTypes.BeerRoutesController);
      await beerRoutes.getById(req, res);

      expect(getDbSpy).toThrowError(mockedError);
      expect(ApiResponser.responseError).toBeCalledTimes(1);
      expect(ApiResponser.responseError).toBeCalledWith(res, mockedError);
    });
  });

  describe('POST /', () => {
    test('Expect create and responseSuccess to be called and response the data', async () => {
      const saveReturn = { id: 1 };
      const mockSave = jest.fn(() => saveReturn);

      (<any>Beer).mockImplementation(() => {
        return {
          save: mockSave,
        };
      });

      const beerRoutes: BeerRoutesController = container.get<BeerRoutesController>(classTypes.BeerRoutesController);
      await beerRoutes.create(req, res);

      expect(Beer).toBeCalledTimes(1);
      expect(mockSave).toBeCalledTimes(1);
      expect(ApiResponser.responseSuccess).toBeCalledTimes(1);
      expect(ApiResponser.responseSuccess).toBeCalledWith(res, saveReturn);
    });

    test('Expect create to throw error', async () => {
      const mockedError = new Error('MOCKED ERROR');
      const mockGetDb = jest.fn(() => {
        throw mockedError;
      });

      (<any>Beer).mockImplementation(() => {
        return {
          save: mockGetDb,
        };
      });

      const getDbSpy = jest.spyOn(container.get<Beer>(classTypes.Beer), 'save');

      const beerRoutes: BeerRoutesController = container.get<BeerRoutesController>(classTypes.BeerRoutesController);
      await beerRoutes.create(req, res);

      expect(getDbSpy).toThrowError(mockedError);
      expect(ApiResponser.responseError).toBeCalledTimes(1);
      expect(ApiResponser.responseError).toBeCalledWith(res, mockedError);
    });
  });

  describe('PUT /:id', () => {
    test('Expect update and responseSuccess to be called and response the data', async () => {
      const updateReturn = { id: 1 };
      const mockUpdate = jest.fn(() => updateReturn);

      (<any>Beer).mockImplementation(() => {
        return {
          update: mockUpdate,
        };
      });

      const beerRoutes: BeerRoutesController = container.get<BeerRoutesController>(classTypes.BeerRoutesController);
      await beerRoutes.update(req, res);

      expect(Beer).toBeCalledTimes(1);
      expect(mockUpdate).toBeCalledTimes(1);
      expect(ApiResponser.responseSuccess).toBeCalledTimes(1);
      expect(ApiResponser.responseSuccess).toBeCalledWith(res, updateReturn);
    });

    test('Expect create to throw error', async () => {
      const mockedError = new Error('MOCKED ERROR');
      const mockupdate = jest.fn(() => {
        throw mockedError;
      });

      (<any>Beer).mockImplementation(() => {
        return {
          update: mockupdate,
        };
      });

      const getDbSpy = jest.spyOn(container.get<Beer>(classTypes.Beer), 'update');

      const beerRoutes: BeerRoutesController = container.get<BeerRoutesController>(classTypes.BeerRoutesController);
      await beerRoutes.update(req, res);

      expect(getDbSpy).toThrowError(mockedError);
      expect(ApiResponser.responseError).toBeCalledTimes(1);
      expect(ApiResponser.responseError).toBeCalledWith(res, mockedError);
    });
  });

  describe('DELETE /:id', () => {
    test('Expect delete and responseSuccess to be called and response the data', async () => {
      const deleteReturn = { id: 1 };
      const mockDelete = jest.fn(() => deleteReturn);

      (<any>Beer).mockImplementation(() => {
        return {
          delete: mockDelete,
        };
      });

      const beerRoutes: BeerRoutesController = container.get<BeerRoutesController>(classTypes.BeerRoutesController);
      await beerRoutes.delete(req, res);

      expect(Beer).toBeCalledTimes(1);
      expect(mockDelete).toBeCalledTimes(1);
      expect(ApiResponser.responseSuccess).toBeCalledTimes(1);
      expect(ApiResponser.responseSuccess).toBeCalledWith(res);
    });

    test('Expect delete to throw error', async () => {
      const mockedError = new Error('MOCKED ERROR');
      const mockDelete = jest.fn(() => {
        throw mockedError;
      });

      (<any>Beer).mockImplementation(() => {
        return {
          delete: mockDelete,
        };
      });

      const getDbSpy = jest.spyOn(container.get<Beer>(classTypes.Beer), 'delete');

      const beerRoutes: BeerRoutesController = container.get<BeerRoutesController>(classTypes.BeerRoutesController);
      await beerRoutes.delete(req, res);

      expect(getDbSpy).toThrowError(mockedError);
      expect(ApiResponser.responseError).toBeCalledTimes(1);
      expect(ApiResponser.responseError).toBeCalledWith(res, mockedError);
    });
  });
});
