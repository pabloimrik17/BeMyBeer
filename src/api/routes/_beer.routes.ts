import express, { Request, Response, Router } from 'express';
import { validationResult } from 'express-validator/check';
import Beer from '../classes/Beer.class';
import BeerDb from '../classes/BeerDb';
import { container } from '../ioc/ioc';
import { ClassTypes } from '../ioc/types';
import { checkBody, checkIdParam } from '../middleware/routes.middleware';
import { createBeer, updateBeer } from '../schemas/_beer.schema';
import ApiResponser from '../shared/apiResponser/ApiResponser';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const beers = await container.get<Beer>(ClassTypes.Beer).getAllDb<BeerDb>();
    ApiResponser.responseSuccess(res, beers);
  } catch (error) {
    ApiResponser.responseError(res, error);
  }
});

router.get('/:id', checkIdParam(), async (req: Request, res: Response) => {
  const idBeer = parseInt(req.params.id, 10);

  try {
    validationResult(req).throw();
    const beer: Beer = container.get<Beer>(ClassTypes.Beer);
    beer.Id = idBeer;
    const beerResponse = await beer.getDb<BeerDb>();

    ApiResponser.responseSuccess(res, beerResponse);
  } catch (error) {
    ApiResponser.responseError(res, error);
  }
});

router.post('/', checkBody(createBeer), async (req: Request, res: Response) => {
  try {
    validationResult(req).throw();
    const beerResponse = await container.get<Beer>(ClassTypes.Beer).save<BeerDb>(req.body);

    ApiResponser.responseSuccess(res, beerResponse);
  } catch (error) {
    ApiResponser.responseError(res, error);
  }
});

router.put('/:id', checkIdParam(), checkBody(updateBeer), async (req: Request, res: Response) => {
  try {
    validationResult(req).throw();

    const idBeer = parseInt(req.params.id, 10);
    const beer: Beer = container.get<Beer>(ClassTypes.Beer);
    beer.Id = idBeer;
    const beerResponse = await beer.update<BeerDb>(req.body);

    ApiResponser.responseSuccess(res, beerResponse);
  } catch (error) {
    ApiResponser.responseError(res, error);
  }
});

router.delete('/:id', checkIdParam(), async (req: Request, res: Response) => {
  const idBeer = parseInt(req.params.id, 10);

  try {
    validationResult(req).throw();
    const beer: Beer = container.get<Beer>(ClassTypes.Beer);
    beer.Id = idBeer;
    await beer.delete();

    ApiResponser.responseSuccess(res);
  } catch (error) {
    ApiResponser.responseError(res, error);
  }
});

export default router;