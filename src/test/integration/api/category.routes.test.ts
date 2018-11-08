import { forOwn, shuffle } from 'lodash';
import supertest from 'supertest';
import CategoryDb from '../../../api/classes/CategoryDb';
import { ICategoryDb } from '../../../api/interfaces/ICategoryDb';
import { container } from '../../../api/ioc/ioc';
import { classTypes } from '../../../api/ioc/types';
import { createCategory, updateCategory } from '../../../api/schemas/category.schema';
import { apiErrors } from '../../../api/shared/apiResponser/ApiErrors';
import ApiResponser, { ApiResponse } from '../../../api/shared/apiResponser/ApiResponser';
import Database from '../../../api/shared/Database';
import App from '../../../App';
import faker = require('faker');
import moment = require('moment');

let app: App = undefined;
let database: Database = undefined;

describe('ENDPOINT /api/category', () => {
  beforeAll(async () => {
    jest.setTimeout(12000);
    jest.resetAllMocks();
    faker.seed(parseInt(moment.utc().toString(), 10));
  });

  beforeEach(async () => {
    app = container.get<App>(classTypes.App);
    database = container.get<Database>(classTypes.Database);

    await app.run();
  });

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

    test('Expect to statusCode be 500 cause no valid id supplied', async () => {
      const response: any = await supertest(app.app)
        .get('/api/category/invalidId');

      const body: ApiResponse = response.body;

      expect(response.statusCode).toBe(500);
      expect(response.type).toBe(ApiResponser.contentType);
      expect(response.charset).toBe(ApiResponser.charset);
      expect(body.responseCode).toBe(apiErrors.ROUTES.NO_VALID_ID_PARAM.code);
      expect(body.responseMessage).toBe(apiErrors.ROUTES.NO_VALID_ID_PARAM.message);
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

    test('Expect statusCode to be 500 cause no all required body fields supplied', async () => {
      const idCategoryQuery: string = 'SELECT idCategory FROM category ORDER BY RAND() LIMIT 1';
      const [categoryRow]: [any, any] = await database.Pool.query(idCategoryQuery);
      expect(categoryRow.length).toBe(1);
      expect(categoryRow[0].idCategory).toBeTruthy();

      const reqBody: ICategoryDb = {
        name: faker.commerce.productName(),
        idParent: categoryRow[0].idCategory,
      };

      const randomReqBody: Object = {};
      shuffle(Object.keys(reqBody)).slice(0, createCategory.required.length - 1).forEach((key: string) => {
        (<any>randomReqBody)[key] = (<any>reqBody)[key];
      });

      const response: any = await supertest(app.app)
        .post('/api/category/')
        .send(randomReqBody)
        .set('Accept', ApiResponser.contentType);

      const body: ApiResponse = response.body;

      expect(response.statusCode).toBe(500);
      expect(response.type).toBe(ApiResponser.contentType);
      expect(response.charset).toBe(ApiResponser.charset);
      expect(body.responseCode).toBe(apiErrors.ROUTES.NO_VALID_BODY.code);
      expect(body.responseMessage).toBe(apiErrors.ROUTES.NO_VALID_BODY.message);
    });

    test('Expect statusCode to be 500 cause no valid body fields types supplied', async () => {
      let i: number = -1;
      const itemsToPick: number = Object.keys(createCategory.properties).length - 1;
      const idCategoryQuery: string = 'SELECT idCategory FROM category ORDER BY RAND() LIMIT ?';
      const [categoryRows]: [any, any] = await database.Pool.query(idCategoryQuery, itemsToPick);
      expect(categoryRows.length).toBe(itemsToPick);

      [
        {
          name: 1,
          idCategory: categoryRows[(i += 1)].idCategory,
        },
        {
          name: faker.commerce.productName(),
          idCategory: 'idCategory',
        },
      ].forEach(async (reqBody: any) => {
        const response: any = await supertest(app.app)
          .post('/api/category/')
          .send(reqBody)
          .set('Accept', ApiResponser.contentType);

        const body: ApiResponse = response.body;

        expect(response.statusCode).toBe(500);
        expect(response.type).toBe(ApiResponser.contentType);
        expect(response.charset).toBe(ApiResponser.charset);
        expect(body.responseCode).toBe(apiErrors.ROUTES.NO_VALID_BODY.code);
        expect(body.responseMessage).toBe(apiErrors.ROUTES.NO_VALID_BODY.message);
      });
    });

    test('Expect statusCode to be 500 cause no idCategory body field supplied doest not exists', async () => {
      const idCategoryQuery: string = 'SELECT MAX(idCategory + 10) as idCategory FROM category';

      const [categoryRow]: [any, any] = await database.Pool.query(idCategoryQuery);
      expect(categoryRow.length).toBe(1);
      expect(categoryRow[0].idCategory).toBeTruthy();

      const reqBody: ICategoryDb = {
        name: faker.commerce.productName(),
        idParent: categoryRow[0].idCategory,
      };

      const response: any = await supertest(app.app)
        .post('/api/category/')
        .send(reqBody)
        .set('Accept', ApiResponser.contentType);

      const body: ApiResponse = response.body;

      expect(response.statusCode).toBe(500);
      expect(response.type).toBe(ApiResponser.contentType);
      expect(response.charset).toBe(ApiResponser.charset);
      expect(body.responseCode).toBe(apiErrors.OBJECT_MODEL.SAVE_QUERY.code);
      expect(body.responseMessage).toBe(apiErrors.OBJECT_MODEL.SAVE_QUERY.message);
    });

    test('Expect statusCode to be 500 cause duplicate category name', async () => {
      const idCategoryQuery: string = 'SELECT idCategory FROM category LIMIT 1';
      const [idCategoryRow]: [any, any] = await database.Pool.query(idCategoryQuery);
      expect(idCategoryRow.length).toBe(1);
      expect(idCategoryRow[0].idCategory).toBeTruthy();

      const categoryNameQuery: string = 'SELECT name FROM category WHERE idCategory != ? LIMIT 1';
      const [nameCategoryRow]: [any, any] = await database.Pool.query(categoryNameQuery, idCategoryRow[0].idCategory);
      expect(nameCategoryRow.length).toBe(1);
      expect(nameCategoryRow[0].name).toBeTruthy();

      const reqBody: ICategoryDb = {
        name: nameCategoryRow[0].name,
        idParent: idCategoryRow[0].idCategory,
      };

      const response: any = await supertest(app.app)
        .post('/api/category/')
        .send(reqBody)
        .set('Accept', ApiResponser.contentType);

      const body: ApiResponse = response.body;

      expect(response.statusCode).toBe(500);
      expect(response.type).toBe(ApiResponser.contentType);
      expect(response.charset).toBe(ApiResponser.charset);
      expect(body.responseCode).toBe(apiErrors.OBJECT_MODEL.SAVE_QUERY.code);
      expect(body.responseMessage).toBe(apiErrors.OBJECT_MODEL.SAVE_QUERY.message);
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

    test('Expect statusCode to be 500 cause no valid body fields types supplied', async () => {
      const itemsToPick: number = Object.keys(updateCategory.properties).length - 1;
      const idCategoryQuery: string = 'SELECT idBeer FROM beer ORDER BY RAND() LIMIT ?';
      const [categoryRows]: [any, any] = await database.Pool.query(idCategoryQuery, itemsToPick);
      expect(categoryRows.length).toBe(itemsToPick);

      await [
        {
          name: 1,
        },
        {
          idParent: 'idParent',
        },
      ].forEach(async (reqBody: any, index: number) => {
        const response: any = await supertest(app.app)
          .put(`/api/category/${categoryRows[index]}`)
          .send(reqBody)
          .set('Accept', ApiResponser.contentType);

        const body: ApiResponse = response.body;

        expect(response.statusCode).toBe(500);
        expect(response.type).toBe(ApiResponser.contentType);
        expect(response.charset).toBe(ApiResponser.charset);
        expect(body.responseCode).toBe(apiErrors.ROUTES.NO_VALID_BODY.code);
        expect(body.responseMessage).toBe(apiErrors.ROUTES.NO_VALID_BODY.message);
      });
    });

    test('Expect statusCode to be 500 cause idCategory body field supplied doest not exists', async () => {
      const idCategoryQuery: string = 'SELECT idCategory FROM category ORDER BY RAND() LIMIT 1';
      const [idCategoryRow]: [any, any] = await database.Pool.query(idCategoryQuery);
      expect(idCategoryRow.length).toBe(1);
      expect(idCategoryRow[0].idCategory).toBeTruthy();

      const idParentQuery: string = 'SELECT MAX(idCategory + 10) as idCategory FROM category';
      const [idParentRow]: [any, any] = await database.Pool.query(idParentQuery);
      expect(idParentRow.length).toBe(1);
      expect(idParentRow[0].idCategory).toBeTruthy();

      const reqBody: any = {
        idParent: idParentRow[0].idCategory,
      };

      const response: any = await supertest(app.app)
        .put(`/api/category/${idCategoryRow[0].idBeer}`)
        .send(reqBody)
        .set('Accept', ApiResponser.contentType);

      const body: ApiResponse = response.body;

      expect(response.statusCode).toBe(500);
      expect(response.type).toBe(ApiResponser.contentType);
      expect(response.charset).toBe(ApiResponser.charset);
      expect(body.responseCode).toBe(apiErrors.OBJECT_MODEL.UPDATE_QUERY.code);
      expect(body.responseMessage).toBe(apiErrors.OBJECT_MODEL.UPDATE_QUERY.message);
    });

    test('Expect statusCode to be 500 cause duplicate beer name', async () => {
      const idCategoryQuery: string = 'SELECT idCategory FROM category ORDER BY RAND() LIMIT 1';
      const [idCategoryRow]: [any, any] = await database.Pool.query(idCategoryQuery);
      expect(idCategoryRow.length).toBe(1);
      expect(idCategoryRow[0].idCategory).toBeTruthy();

      const categoryNameQuery: string = 'SELECT name FROM category WHERE idCategory != ? LIMIT 1';
      const [nameCategoryRow]: [any, any] = await database.Pool.query(categoryNameQuery, idCategoryRow[0].idCategory);
      expect(nameCategoryRow.length).toBe(1);
      expect(nameCategoryRow[0].name).toBeTruthy();

      const reqBody: Object = {
        name: nameCategoryRow[0].name,
      };

      const response: any = await supertest(app.app)
        .put(`/api/category/${idCategoryRow[0].idCategory}`)
        .send(reqBody)
        .set('Accept', ApiResponser.contentType);

      const body: ApiResponse = response.body;

      expect(response.statusCode).toBe(500);
      expect(response.type).toBe(ApiResponser.contentType);
      expect(response.charset).toBe(ApiResponser.charset);
      expect(body.responseCode).toBe(apiErrors.OBJECT_MODEL.UPDATE_QUERY.code);
      expect(body.responseMessage).toBe(apiErrors.OBJECT_MODEL.UPDATE_QUERY.message);
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

    test('Expect to statusCode be 500 cause no valid id supplied', async () => {
      const response: any = await supertest(app.app)
        .delete('/api/category/invalidId');

      const body: ApiResponse = response.body;

      expect(response.statusCode).toBe(500);
      expect(response.type).toBe(ApiResponser.contentType);
      expect(response.charset).toBe(ApiResponser.charset);
      expect(body.responseCode).toBe(apiErrors.ROUTES.NO_VALID_ID_PARAM.code);
      expect(body.responseMessage).toBe(apiErrors.ROUTES.NO_VALID_ID_PARAM.message);
    });
  });
});
