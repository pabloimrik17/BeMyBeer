// // http://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/
// // https://codewithhugo.com/testing-an-express-app-with-supertest-moxios-and-jest/
// https://tobythetesterblog.wordpress.com/2016/05/01/mocking-a-restful-api-using-nock-supertest-mocha-and-chai/
// // https://github.com/nock/nock
// // https://www.npmjs.com/package/superagent
//
// import nock, { Scope } from 'nock';
// import supertest, { Response, SuperTest, Test } from 'supertest';
// import { container } from '../../../api/ioc/ioc';
// import { classTypes } from '../../../api/ioc/types';
// import App from '../../../App';
//
// const app: App = container.get<App>(classTypes.App);
// const apiRequest: SuperTest<Test> = supertest('http://localhost:3000');
//
// require('dotenv').config();
//
// // NOCK --> MOCKEAR API CALL
// // SUPERTEST --> HACER LA LLAMADA AL API
// // JEST-EXPRESS - MOCKEAR API CALL A NIVEL DE APP, NO DE RUTA
//
// describe('/beer', () => {
//   beforeAll(async () => {
//     // await app.run();
//     console.log('RUN!');
//   });
//
//   describe('GET', () => {
//     test('Expect', async () => {
//
//       nock('http://localhost:3000')
//         .get('/api/beer')
//         // simulate a 10 second delay
//         .delayBody(10000)
//         .reply(200, {
//           status: 200,
//           message: 'This simulates a 10 second delay',
//         });
//
//       // const response: Response = await apiRequest.get('/api/beer');
//       expect(1).toBe(1);
//       // console.log(response.body);
//     });
//   });
// });

test('TODO', () => {
  expect(1).toBe(1);
});
