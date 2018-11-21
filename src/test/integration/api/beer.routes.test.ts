// http://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/
// https://codewithhugo.com/testing-an-express-app-with-supertest-moxios-and-jest/
// https://tobythetesterblog.wordpress.com/2016/05/01/mocking-a-restful-api-using-nock-supertest-mocha-and-chai/

import faker from 'faker';
import { forOwn, shuffle } from 'lodash';
import moment from 'moment';
import supertest from 'supertest';
import BeerDb from '../../../api/classes/BeerDb';
import DateModel from '../../../api/classes/DateModel';
import { IBeerDb } from '../../../api/interfaces/IBeerDb';
import { IDatabaseDate } from '../../../api/interfaces/IDatabaseDate';
import { container } from '../../../api/ioc/ioc';
import { classTypes } from '../../../api/ioc/types';
import { createBeer } from '../../../api/schemas/beer.schema';
import { updateCategory } from '../../../api/schemas/category.schema';
import { apiErrors } from '../../../api/shared/apiResponser/ApiErrors';
import ApiResponser, { ApiResponse } from '../../../api/shared/apiResponser/ApiResponser';
import Database from '../../../api/shared/Database';
import App from '../../../App';

let app: App = undefined;
let database: Database = undefined;
const dateModel: DateModel = container.get<DateModel>(classTypes.DateModel);

export function createBeerName(): string {
  return `${moment().unix().toString()}_${faker.commerce.productName()}`;
}

export async function createBeerAndRetrieveId(): Promise<number> {
  const beer: IBeerDb & IDatabaseDate = {
    name: createBeerName(),
    graduation: faker.random.number({ min: 0, max: 12, precision: 2 }),
    color: '#7D7D7D', // TODO FAKER RANDOM HEXA
    score: faker.random.number(),
    price: faker.random.number({ min: 0, max: 12, precision: 2 }),
    idCategory: null,
    datePurchased: moment().format(DateModel.DATE_FORMAT),
    dateDrinked: moment().format(DateModel.DATE_FORMAT),
    createdAt: dateModel.getCurrentDateTime(),
    updatedAt: dateModel.getCurrentDateTime(),
  };

  const beerQuery: string = 'INSERT INTO beer SET ?';
  const [beerQueryResult]: [any, any] = await database.Pool.query(beerQuery, beer);

  return beerQueryResult.insertId;
}

export async function createManyBeerAndRetrieveId(itemsToCreate: number): Promise<number[]> {
  const beers: number[] = [];

  if (itemsToCreate > 0) {
    for (let i = 0; i < itemsToCreate; i++) {
      beers.push(await createBeerAndRetrieveId());
    }
  }
  return beers;
}

describe('ENDPOINT /api/beer', () => {
  beforeAll(async () => {
    jest.setTimeout(12000);
    jest.resetAllMocks();
    faker.seed(parseInt(moment.utc().toString(), 10));

    app = container.get<App>(classTypes.App);
    database = container.get<Database>(classTypes.Database);

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

    test('Expect to statusCode be 500 cause no valid id supplied', async () => {
      const response: any = await supertest(app.app).get('/api/beer/invalidId');
      const body: ApiResponse = response.body;

      expect(response.statusCode).toBe(500);
      expect(response.type).toBe(ApiResponser.contentType);
      expect(response.charset).toBe(ApiResponser.charset);
      expect(body.responseCode).toBe(apiErrors.ROUTES.NO_VALID_ID_PARAM.code);
      expect(body.responseMessage).toBe(apiErrors.ROUTES.NO_VALID_ID_PARAM.message);
    });
  });

  describe('POST /', () => {
    test('Expect to create a beer with only the required fields and server to return it', async () => {
      const reqBody: IBeerDb = {
        name: createBeerName(),
        graduation: faker.random.number({ min: 0, max: 12, precision: 2 }),
        idCategory: null,
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

      const reqBody: IBeerDb = {
        name: createBeerName(),
        graduation: faker.random.number({ min: 0, max: 12, precision: 2 }),
        color: '#7D7D7D', // TODO FAKER RANDOM HEXA
        score: faker.random.number(),
        price: faker.random.number({ min: 0, max: 12, precision: 2 }),
        idCategory: null,
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

    test('Expect statusCode to be 500 cause no all required body fields supplied', async () => {

      const reqBody: IBeerDb = {
        name: createBeerName(),
        graduation: faker.random.number({ min: 0, max: 12, precision: 2 }),
        idCategory: null,
        datePurchased: moment().format(DateModel.DATE_FORMAT),
      };

      const randomReqBody: Object = {};
      shuffle(Object.keys(reqBody)).slice(0, createBeer.required.length - 1).forEach((key: string) => {
        (<any>randomReqBody)[key] = (<any>reqBody)[key];
      });

      const response: any = await supertest(app.app)
        .post('/api/beer/')
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
      [
        {
          name: 1,
          graduation: faker.random.number({ min: 0, max: 12, precision: 2 }),
          color: '#7D7D7D', // TODO FAKER RANDOM HEXA
          score: faker.random.number(),
          price: faker.random.number({ min: 0, max: 12, precision: 2 }),
          idCategory: null,
          datePurchased: moment().format(DateModel.DATE_FORMAT),
          dateDrinked: moment().format(DateModel.DATE_FORMAT),
        },
        {
          name: createBeerName(),
          graduation: 'graduation',
          color: '#7D7D7D', // TODO FAKER RANDOM HEXA
          score: faker.random.number(),
          price: faker.random.number({ min: 0, max: 12, precision: 2 }),
          idCategory: null,
          datePurchased: moment().format(DateModel.DATE_FORMAT),
          dateDrinked: moment().format(DateModel.DATE_FORMAT),
        },
        {
          name: createBeerName(),
          graduation: faker.random.number({ min: 0, max: 12, precision: 2 }),
          color: 1, // TODO FAKER RANDOM HEXA
          score: faker.random.number(),
          price: faker.random.number({ min: 0, max: 12, precision: 2 }),
          idCategory: null,
          datePurchased: moment().format(DateModel.DATE_FORMAT),
          dateDrinked: moment().format(DateModel.DATE_FORMAT),
        },
        {
          name: createBeerName(),
          graduation: faker.random.number({ min: 0, max: 12, precision: 2 }),
          color: '#7D7D7D', // TODO FAKER RANDOM HEXA
          score: 'score',
          price: faker.random.number({ min: 0, max: 12, precision: 2 }),
          idCategory: null,
          datePurchased: moment().format(DateModel.DATE_FORMAT),
          dateDrinked: moment().format(DateModel.DATE_FORMAT),
        },
        {
          name: createBeerName(),
          graduation: faker.random.number({ min: 0, max: 12, precision: 2 }),
          color: '#7D7D7D', // TODO FAKER RANDOM HEXA
          score: faker.random.number(),
          price: 'price',
          idCategory: null,
          datePurchased: moment().format(DateModel.DATE_FORMAT),
          dateDrinked: moment().format(DateModel.DATE_FORMAT),
        },
        {
          name: createBeerName(),
          graduation: faker.random.number({ min: 0, max: 12, precision: 2 }),
          color: '#7D7D7D', // TODO FAKER RANDOM HEXA
          score: faker.random.number(),
          price: faker.random.number({ min: 0, max: 12, precision: 2 }),
          idCategory: 'idCategory',
          datePurchased: moment().format(DateModel.DATE_FORMAT),
          dateDrinked: moment().format(DateModel.DATE_FORMAT),
        },
        {
          name: createBeerName(),
          graduation: faker.random.number({ min: 0, max: 12, precision: 2 }),
          color: '#7D7D7D', // TODO FAKER RANDOM HEXA
          score: faker.random.number(),
          price: faker.random.number({ min: 0, max: 12, precision: 2 }),
          idCategory: null,
          datePurchased: 1,
          dateDrinked: moment().format(DateModel.DATE_FORMAT),
        },
        {
          name: createBeerName(),
          graduation: faker.random.number({ min: 0, max: 12, precision: 2 }),
          color: '#7D7D7D', // TODO FAKER RANDOM HEXA
          score: faker.random.number(),
          price: faker.random.number({ min: 0, max: 12, precision: 2 }),
          idCategory: null,
          datePurchased: moment().format(DateModel.DATE_FORMAT),
          dateDrinked: 1,
        },
      ].forEach(async (reqBody: any) => {
        const response: any = await supertest(app.app)
          .post('/api/beer/')
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
      const idCategoryQuery: string = 'SELECT MAX(idCategory + 1000) as idCategory FROM category';

      const [categoryRow]: [any, any] = await database.Pool.query(idCategoryQuery);
      expect(categoryRow.length).toBe(1);
      expect(categoryRow[0].idCategory).toBeTruthy();

      const reqBody: IBeerDb = {
        name: createBeerName(),
        graduation: faker.random.number({ min: 0, max: 12, precision: 2 }),
        idCategory: categoryRow[0].idCategory,
        datePurchased: moment().format(DateModel.DATE_FORMAT),
      };

      const response: any = await supertest(app.app)
        .post('/api/beer/')
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

      const beerNameQuery: string = 'SELECT name FROM beer LIMIT 1';
      const [beerRow]: [any, any] = await database.Pool.query(beerNameQuery);
      expect(beerRow.length).toBe(1);
      expect(beerRow[0].name).toBeTruthy();

      const reqBody: IBeerDb = {
        name: beerRow[0].name,
        graduation: faker.random.number({ min: 0, max: 12, precision: 2 }),
        idCategory: null,
        datePurchased: moment().format(DateModel.DATE_FORMAT),
      };

      const response: any = await supertest(app.app)
        .post('/api/beer/')
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
    test('Expect to update a beer and server to return it', async () => {
      const idBeer = await createBeerAndRetrieveId();
      expect(idBeer).toBeTruthy();

      const reqBody: IBeerDb = {
        name: faker.commerce.productName(),
        graduation: faker.random.number({ min: 0, max: 12, precision: 2 }),
        color: '#7D7D7D', // TODO FAKER RANDOM HEXA
        score: faker.random.number(),
        price: faker.random.number({ min: 0, max: 12, precision: 2 }),
        idCategory: null,
        datePurchased: moment().format(DateModel.DATE_FORMAT),
        dateDrinked: moment().format(DateModel.DATE_FORMAT),
      };

      const response: any = await supertest(app.app)
        .put(`/api/beer/${idBeer}`)
        .send(reqBody)
        .set('Accept', ApiResponser.contentType);

      const body: ApiResponse = response.body;
      const responseData: BeerDb = body.responseData as BeerDb;

      expect(responseData.idBeer).toBeTruthy();
      const beerQuery: string = 'SELECT * FROM beer WHERE idBeer = ? LIMIT 1';
      const [beerRow]: [any, any] = await database.Pool.query(beerQuery, idBeer);

      expect(response.statusCode).toBe(200);
      expect(response.type).toBe(ApiResponser.contentType);
      expect(response.charset).toBe(ApiResponser.charset);
      expect(body.responseCode).toBe(apiErrors.DEFAULT.SUCCESS.code);
      expect(body.responseMessage).toBe(apiErrors.DEFAULT.SUCCESS.message);
      forOwn(responseData, (value: any, key: string) => {
        expect(value).toBe(beerRow[0][key]);
      });
    });

    test('Expect statusCode to be 500 cause no valid body fields types supplied', async () => {
      const itemsToPick: number = Object.keys(updateCategory.properties).length - 1;
      const beerRows = await createManyBeerAndRetrieveId(itemsToPick);
      expect(beerRows.length).toBe(itemsToPick);

      await [
        {
          name: 1,
        },
        {
          graduation: 'graduation',
        },
        {
          color: 1, // TODO FAKER RANDOM HEXA
        },
        {
          score: 'score',
        },
        {
          price: 'price',
        },
        {
          idCategory: 'idCategory',
        },
        {
          datePurchased: 1,
        },
        {
          dateDrinked: 1,
        },
      ].forEach(async (reqBody: any, index: number) => {
        const response: any = await supertest(app.app)
          .put(`/api/beer/${beerRows[index]}`)
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
      const idBeer = await createBeerAndRetrieveId();
      expect(idBeer).toBeTruthy();

      const idCategoryQuery: string = 'SELECT MAX(idCategory + 1000) as idCategory FROM category';
      const [categoryRow]: [any, any] = await database.Pool.query(idCategoryQuery);
      expect(categoryRow.length).toBe(1);
      expect(categoryRow[0].idCategory).toBeTruthy();

      const reqBody: any = {
        idCategory: categoryRow[0].idCategory,
      };

      const response: any = await supertest(app.app)
        .put(`/api/beer/${idBeer}`)
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
      const idBeer = await createBeerAndRetrieveId();
      expect(idBeer).toBeTruthy();

      const beerNameQuery: string = 'SELECT name FROM beer WHERE idBeer != ? LIMIT 1';
      const [nameBeerRow]: [any, any] = await database.Pool.query(beerNameQuery, idBeer);
      expect(nameBeerRow.length).toBe(1);
      expect(nameBeerRow[0].name).toBeTruthy();

      const reqBody: Object = {
        name: nameBeerRow[0].name,
      };

      const response: any = await supertest(app.app)
        .put(`/api/beer/${idBeer}`)
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
    test('Expect to delete a beer', async () => {
      const idBeer = await createBeerAndRetrieveId();
      expect(idBeer).toBeTruthy();

      const response: any = await supertest(app.app)
        .delete(`/api/beer/${idBeer}`);

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
        .delete('/api/beer/invalidId');

      const body: ApiResponse = response.body;

      expect(response.statusCode).toBe(500);
      expect(response.type).toBe(ApiResponser.contentType);
      expect(response.charset).toBe(ApiResponser.charset);
      expect(body.responseCode).toBe(apiErrors.ROUTES.NO_VALID_ID_PARAM.code);
      expect(body.responseMessage).toBe(apiErrors.ROUTES.NO_VALID_ID_PARAM.message);
    });
  });
});
