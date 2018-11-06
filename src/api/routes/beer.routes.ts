import express, { Request, Response, Router } from 'express';
import BeerRoutesController from '../controllers/BeerRoutesController';
import { container } from '../ioc/ioc';
import { classTypes } from '../ioc/types';
import { checkBody, checkIdParam } from '../middleware/routes.middleware';
import { createBeer, updateBeer } from '../schemas/beer.schema';

const router: Router = express.Router();

router.get('/', async (req: any, res: any) => {
  await container.get<BeerRoutesController>(classTypes.BeerRoutesController).getAll(req, res);
});

router.get('/:id', checkIdParam(), async (req: Request, res: Response) => {
  await container.get<BeerRoutesController>(classTypes.BeerRoutesController).getById(req, res);
});

router.post('/', checkBody(createBeer), async (req: Request, res: Response) => {
  await container.get<BeerRoutesController>(classTypes.BeerRoutesController).create(req, res);
});

router.put('/:id', checkIdParam(), checkBody(updateBeer), async (req: Request, res: Response) => {
  await container.get<BeerRoutesController>(classTypes.BeerRoutesController).update(req, res);
});

router.delete('/:id', checkIdParam(), async (req: Request, res: Response) => {
  await container.get<BeerRoutesController>(classTypes.BeerRoutesController).delete(req, res);
});

export default router;
