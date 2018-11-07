// http://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/
// https://codewithhugo.com/testing-an-express-app-with-supertest-moxios-and-jest/
// https://tobythetesterblog.wordpress.com/2016/05/01/mocking-a-restful-api-using-nock-supertest-mocha-and-chai/

import { forOwn } from 'lodash';
import supertest from 'supertest';
import CategoryDb from '../../../api/classes/CategoryDb';
import { ICategoryDb } from '../../../api/interfaces/ICategoryDb';
import { container } from '../../../api/ioc/ioc';
import { classTypes } from '../../../api/ioc/types';
import { apiErrors } from '../../../api/shared/apiResponser/ApiErrors';
import ApiResponser, { ApiResponse } from '../../../api/shared/apiResponser/ApiResponser';
import Database from '../../../api/shared/Database';
import App from '../../../App';
import faker = require('faker');

let app: App = undefined;
let database: Database = undefined;

describe('ENDPOINT /api/category', () => {
  beforeAll(async () => {
    jest.setTimeout(12000);
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    app = container.get<App>(classTypes.App);
    database = container.get<Database>(classTypes.Database);

    await app.run();
  })

  afterAll(async () => {
    await app.stop();
    jest.setTimeout(5000);
  });

  describe('GET /', () => {
    test('Expect to response an ApiResponse object with all the category data', async () => {
      const query: string = 'SELECT * FROM category';
      const [rows]: [any, any] = await database.Pool.query(query);

      const response: any = await supertest(app.app).get('/api/category');
      const body: ApiResponse = response.body;
      const responseData: CategoryDb[] = body.responseData as CategoryDb[];

      expect(response.statusCode).toBe(200);
      expect(response.type).toBe(ApiResponser.contentType);
      expect(response.charset).toBe(ApiResponser.charset);
      expect(body.responseCode).toBe(apiErrors.DEFAULT.SUCCESS.code);
      expect(body.responseMessage).toBe(apiErrors.DEFAULT.SUCCESS.message);
      expect(responseData.length).toBe(rows.length);
      responseData.forEach((data: CategoryDb, index: number) => {
        forOwn(data, (value: any, key: string) => {
          expect(value).toBe(rows[index][key]);
        });
      });
    });
  });

  describe('GET /:id', () => {
    test('Expect to response an ApiResponse object with a certain category data', async () => {
      const query: string = 'SELECT * FROM category ORDER BY RAND() LIMIT 1';
      const [rows]: [any, any] = await database.Pool.query(query);
      expect(rows.length).toBe(1);
      expect(rows[0].idCategory).toBeTruthy();

      const response: any = await supertest(app.app).get(`/api/category/${rows[0].idCategory}`);
      const body: ApiResponse = response.body;
      const responseData: CategoryDb = body.responseData as CategoryDb;

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
    test('Expect to create a category with only the required fields and server to return it', async () => {
      const idCategoryQuery: string = 'SELECT idCategory FROM category ORDER BY RAND() LIMIT 1';
      const [idCategoryRow]: [any, any] = await database.Pool.query(idCategoryQuery);
      expect(idCategoryRow.length).toBe(1);
      expect(idCategoryRow[0].idCategory).toBeTruthy();

      const reqBody: ICategoryDb = {
        name: faker.commerce.productName(),
        idParent: idCategoryRow[0].idCategory,
      };

      const response: any = await supertest(app.app)
        .post('/api/category')
        .send(reqBody)
        .set('Accept', ApiResponser.contentType);

      const body: ApiResponse = response.body;
      const responseData: CategoryDb = body.responseData as CategoryDb;

      expect(responseData.idCategory).toBeTruthy();
      const categoryQuery: string = 'SELECT * FROM category WHERE idCategory = ? LIMIT 1';
      const [categoryRow]: [any, any] = await database.Pool.query(categoryQuery, responseData.idCategory);

      expect(response.statusCode).toBe(200);
      expect(response.type).toBe(ApiResponser.contentType);
      expect(response.charset).toBe(ApiResponser.charset);
      expect(body.responseCode).toBe(apiErrors.DEFAULT.SUCCESS.code);
      expect(body.responseMessage).toBe(apiErrors.DEFAULT.SUCCESS.message);
      forOwn(responseData, (value: any, key: string) => {
        expect(value).toBe(categoryRow[0][key]);
      });
    });

    test('Expect to create a category with all fields and server to return it', async () => {
      const idCategoryQuery: string = 'SELECT idCategory FROM category ORDER BY RAND() LIMIT 1';
      const [idCategoryRow]: [any, any] = await database.Pool.query(idCategoryQuery);
      expect(idCategoryRow.length).toBe(1);
      expect(idCategoryRow[0].idCategory).toBeTruthy();

      const reqBody: ICategoryDb = {
        name: faker.commerce.productName(),
        idParent: idCategoryRow[0].idCategory,
      };

      const response: any = await supertest(app.app)
        .post('/api/category')
        .send(reqBody)
        .set('Accept', ApiResponser.contentType);

      const body: ApiResponse = response.body;
      const responseData: CategoryDb = body.responseData as CategoryDb;

      expect(responseData.idCategory).toBeTruthy();
      const categoryQuery: string = 'SELECT * FROM category WHERE idCategory = ? LIMIT 1';
      const [categoryRow]: [any, any] = await database.Pool.query(categoryQuery, responseData.idCategory);

      expect(response.statusCode).toBe(200);
      expect(response.type).toBe(ApiResponser.contentType);
      expect(response.charset).toBe(ApiResponser.charset);
      expect(body.responseCode).toBe(apiErrors.DEFAULT.SUCCESS.code);
      expect(body.responseMessage).toBe(apiErrors.DEFAULT.SUCCESS.message);
      forOwn(responseData, (value: any, key: string) => {
        expect(value).toBe(categoryRow[0][key]);
      });
    });
  });

  describe('PUT /', () => {
    test('Expect to update a category and server to return it', async () => {
      const idCategoryQuery: string = 'SELECT idCategory FROM category ORDER BY RAND() LIMIT 1';
      const [idCategoryRow]: [any, any] = await database.Pool.query(idCategoryQuery);
      expect(idCategoryRow.length).toBe(1);
      expect(idCategoryRow[0].idCategory).toBeTruthy();

      const reqBody: ICategoryDb = {
        name: faker.commerce.productName(),
        idParent: idCategoryRow[0].idCategory,
      };

      const response: any = await supertest(app.app)
        .put(`/api/category/${idCategoryRow[0].idCategory}`)
        .send(reqBody)
        .set('Accept', ApiResponser.contentType);

      const body: ApiResponse = response.body;
      const responseData: CategoryDb = body.responseData as CategoryDb;

      expect(responseData.idCategory).toBeTruthy();
      const categoryQuery: string = 'SELECT * FROM category WHERE idCategory = ? LIMIT 1';
      const [categoryRow]: [any, any] = await database.Pool.query(categoryQuery, idCategoryRow[0].idCategory);

      expect(response.statusCode).toBe(200);
      expect(response.type).toBe(ApiResponser.contentType);
      expect(response.charset).toBe(ApiResponser.charset);
      expect(body.responseCode).toBe(apiErrors.DEFAULT.SUCCESS.code);
      expect(body.responseMessage).toBe(apiErrors.DEFAULT.SUCCESS.message);
      forOwn(responseData, (value: any, key: string) => {
        expect(value).toBe(categoryRow[0][key]);
      });
    });
  });

  describe('DELETE /', () => {
    test('Expect to delete a category', async () => {
      const idCategoryQuery: string = 'SELECT idCategory FROM category ORDER BY RAND() LIMIT 1';
      const [idCategoryRow]: [any, any] = await database.Pool.query(idCategoryQuery);
      expect(idCategoryRow.length).toBe(1);
      expect(idCategoryRow[0].idCategory).toBeTruthy();

      const response: any = await supertest(app.app)
        .delete(`/api/category/${idCategoryRow[0].idCategory}`);

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
