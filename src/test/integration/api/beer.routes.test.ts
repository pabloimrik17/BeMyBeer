// http://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/
// https://codewithhugo.com/testing-an-express-app-with-supertest-moxios-and-jest/
// https://tobythetesterblog.wordpress.com/2016/05/01/mocking-a-restful-api-using-nock-supertest-mocha-and-chai/

import { forOwn } from 'lodash';
import supertest from 'supertest';
import BeerDb from '../../../api/classes/BeerDb';
import DateModel from '../../../api/classes/DateModel';
import { IBeerDb } from '../../../api/interfaces/IBeerDb';
import { container } from '../../../api/ioc/ioc';
import { classTypes } from '../../../api/ioc/types';
import { apiErrors } from '../../../api/shared/apiResponser/ApiErrors';
import ApiResponser, { ApiResponse } from '../../../api/shared/apiResponser/ApiResponser';
import Database from '../../../api/shared/Database';
import App from '../../../App';
import faker = require('faker');
import moment = require('moment');

const app: App = container.get<App>(classTypes.App);
const database: Database = container.get<Database>(classTypes.Database);

describe('ENDPOINT /api/beer', () => {
  beforeAll(async () => {
    jest.setTimeout(12000);
    await app.run();
  });

  afterAll(async () => {
    await app.stop();
    jest.setTimeout(5000);
  });

  describe('GET /', () => {
    test('Expect to response an ApiResponse object with all the beers data', async () => {
      const query: string = 'SELECT * FROM beer';
      const [rows]: [any, any] = await database.Pool.query(query);

      const response: any = await supertest(app.app).get('/api/beer');
      const body: ApiResponse = response.body;
      const responseData: BeerDb[] = body.responseData as BeerDb[];

      expect(response.statusCode).toBe(200);
      expect(response.type).toBe(ApiResponser.contentType);
      expect(response.charset).toBe(ApiResponser.charset);
      expect(body.responseCode).toBe(apiErrors.DEFAULT.SUCCESS.code);
      expect(body.responseMessage).toBe(apiErrors.DEFAULT.SUCCESS.message);
      expect(responseData.length).toBe(rows.length);
      responseData.forEach((data: BeerDb, index: number) => {
        forOwn(data, (value: any, key: string) => {
          expect(value).toBe(rows[index][key]);
        });
      });
    });
  });

  describe('GET /:id', () => {
    test('Expect to response an ApiResponse object with a certain beers data', async () => {
      const query: string = 'SELECT * FROM beer ORDER BY RAND() LIMIT 1';
      const [rows]: [any, any] = await database.Pool.query(query);
      expect(rows.length).toBe(1);
      expect(rows[0].idBeer).toBeTruthy();

      const response: any = await supertest(app.app).get(`/api/beer/${rows[0].idBeer}`);
      const body: ApiResponse = response.body;
      const responseData: BeerDb = body.responseData as BeerDb;

      expect(response.statusCode).toBe(200);
      expect(response.type).toBe(ApiResponser.contentType);
      expect(response.charset).toBe(ApiResponser.charset);
      expect(body.responseCode).toBe(apiErrors.DEFAULT.SUCCESS.code);
      expect(body.responseMessage).toBe(apiErrors.DEFAULT.SUCCESS.message);
      forOwn(responseData, (value: any, key: string) => {
        expect(value).toBe(rows[0][key]);
      });
    });
  });

  describe('POST /', () => {
    test('Expect to create a beer with only the required fields and server to return it', async () => {
      const idCategoryQuery: string = 'SELECT idCategory FROM category ORDER BY RAND() LIMIT 1';
      const [categoryRow]: [any, any] = await database.Pool.query(idCategoryQuery);
      expect(categoryRow.length).toBe(1);
      expect(categoryRow[0].idCategory).toBeTruthy();

      const reqBody: any = {
        name: faker.commerce.productName(),
        graduation: faker.random.number({ min: 0, max: 12, precision: 2 }),
        idCategory: categoryRow[0].idCategory,
        datePurchased: moment().format(DateModel.DATE_FORMAT),
      };

      const response: any = await supertest(app.app)
        .post('/api/beer/')
        .send(reqBody)
        .set('Accept', ApiResponser.contentType);

      const body: ApiResponse = response.body;
      const responseData: BeerDb = body.responseData as BeerDb;

      expect(responseData.idBeer).toBeTruthy();
      const beerQuery: string = 'SELECT * FROM beer WHERE idBeer = ? LIMIT 1';
      const [beerRow]: [any, any] = await database.Pool.query(beerQuery, responseData.idBeer);

      expect(response.statusCode).toBe(200);
      expect(response.type).toBe(ApiResponser.contentType);
      expect(response.charset).toBe(ApiResponser.charset);
      expect(body.responseCode).toBe(apiErrors.DEFAULT.SUCCESS.code);
      expect(body.responseMessage).toBe(apiErrors.DEFAULT.SUCCESS.message);
      forOwn(responseData, (value: any, key: string) => {
        expect(value).toBe(beerRow[0][key]);
      });
    });

    test('Expect to create a beer with all fields and server to return it', async () => {
      const idCategoryQuery: string = 'SELECT idCategory FROM category ORDER BY RAND() LIMIT 1';
      const [categoryRow]: [any, any] = await database.Pool.query(idCategoryQuery);
      expect(categoryRow.length).toBe(1);
      expect(categoryRow[0].idCategory).toBeTruthy();

      const reqBody: IBeerDb = {
        name: faker.commerce.productName(),
        graduation: faker.random.number({ min: 0, max: 12, precision: 2 }),
        color: '#7D7D7D', // TODO FAKER RANDOM HEXA
        score: faker.random.number(),
        price: faker.random.number({ min: 0, max: 12, precision: 2 }),
        idCategory: categoryRow[0].idCategory,
        datePurchased: moment().format(DateModel.DATE_FORMAT),
        dateDrinked: moment().format(DateModel.DATE_FORMAT),
      };

      const response: any = await supertest(app.app)
        .post('/api/beer/')
        .send(reqBody)
        .set('Accept', ApiResponser.contentType);

      const body: ApiResponse = response.body;
      const responseData: BeerDb = body.responseData as BeerDb;

      expect(responseData.idBeer).toBeTruthy();
      const beerQuery: string = 'SELECT * FROM beer WHERE idBeer = ? LIMIT 1';
      const [beerRow]: [any, any] = await database.Pool.query(beerQuery, responseData.idBeer);

      expect(response.statusCode).toBe(200);
      expect(response.type).toBe(ApiResponser.contentType);
      expect(response.charset).toBe(ApiResponser.charset);
      expect(body.responseCode).toBe(apiErrors.DEFAULT.SUCCESS.code);
      expect(body.responseMessage).toBe(apiErrors.DEFAULT.SUCCESS.message);
      forOwn(responseData, (value: any, key: string) => {
        expect(value).toBe(beerRow[0][key]);
      });
    });
  });

  describe('PUT /', () => {
    test('Expect to update a beer and server to return it', async () => {
      const idBeerQuery: string = 'SELECT idBeer FROM beer ORDER BY RAND() LIMIT 1';
      const [idBeerRow]: [any, any] = await database.Pool.query(idBeerQuery);
      expect(idBeerRow.length).toBe(1);
      expect(idBeerRow[0].idBeer).toBeTruthy();

      const idCategoryQuery: string = 'SELECT idCategory FROM category ORDER BY RAND() LIMIT 1';
      const [idCategoryRow]: [any, any] = await database.Pool.query(idCategoryQuery);
      expect(idCategoryRow.length).toBe(1);
      expect(idCategoryRow[0].idCategory).toBeTruthy();

      const reqBody: IBeerDb = {
        name: faker.commerce.productName(),
        graduation: faker.random.number({ min: 0, max: 12, precision: 2 }),
        color: '#7D7D7D', // TODO FAKER RANDOM HEXA
        score: faker.random.number(),
        price: faker.random.number({ min: 0, max: 12, precision: 2 }),
        idCategory: idCategoryRow[0].idCategory,
        datePurchased: moment().format(DateModel.DATE_FORMAT),
        dateDrinked: moment().format(DateModel.DATE_FORMAT),
      };

      const response: any = await supertest(app.app)
        .put(`/api/beer/${idBeerRow[0].idBeer}`)
        .send(reqBody)
        .set('Accept', ApiResponser.contentType);

      const body: ApiResponse = response.body;
      const responseData: BeerDb = body.responseData as BeerDb;

      expect(responseData.idBeer).toBeTruthy();
      const beerQuery: string = 'SELECT * FROM beer WHERE idBeer = ? LIMIT 1';
      const [beerRow]: [any, any] = await database.Pool.query(beerQuery, idBeerRow[0].idBeer);

      expect(response.statusCode).toBe(200);
      expect(response.type).toBe(ApiResponser.contentType);
      expect(response.charset).toBe(ApiResponser.charset);
      expect(body.responseCode).toBe(apiErrors.DEFAULT.SUCCESS.code);
      expect(body.responseMessage).toBe(apiErrors.DEFAULT.SUCCESS.message);
      forOwn(responseData, (value: any, key: string) => {
        expect(value).toBe(beerRow[0][key]);
      });
    });
  });

  describe('DELETE /', () => {
    test('Expect to delete a beer', async () => {
      const idBeerQuery: string = 'SELECT idBeer FROM beer ORDER BY RAND() LIMIT 1';
      const [idBeerRow]: [any, any] = await database.Pool.query(idBeerQuery);
      expect(idBeerRow.length).toBe(1);
      expect(idBeerRow[0].idBeer).toBeTruthy();

      const response: any = await supertest(app.app)
        .delete(`/api/beer/${idBeerRow[0].idBeer}`);

      const body: ApiResponse = response.body;

      expect(response.statusCode).toBe(200);
      expect(response.type).toBe(ApiResponser.contentType);
      expect(response.charset).toBe(ApiResponser.charset);
      expect(body.responseCode).toBe(apiErrors.DEFAULT.SUCCESS.code);
      expect(body.responseMessage).toBe(apiErrors.DEFAULT.SUCCESS.message);
      expect(body.responseData).toEqual({});
    });
  });
});
