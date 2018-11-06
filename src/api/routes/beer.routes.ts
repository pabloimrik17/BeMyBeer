import express, { Request, Response, Router } from 'express';
import BeerRoutesController from '../controllers/BeerRoutesController';
import { container } from '../ioc/ioc';
import { ClassTypes } from '../ioc/types';
import { checkBody, checkIdParam } from '../middleware/routes.middleware';
import { createBeer, updateBeer } from '../schemas/beer.schema';

const router: Router = express.Router();

router.get('/', async (req: any, res: any) => {
  await container.get<BeerRoutesController>(ClassTypes.BeerRoutes).getAll(req, res);
});

router.get('/:id', checkIdParam(), async (req: Request, res: Response) => {
  await container.get<BeerRoutesController>(ClassTypes.BeerRoutes).getById(req, res);
});

router.post('/', checkBody(createBeer), async (req: Request, res: Response) => {
  await container.get<BeerRoutesController>(ClassTypes.BeerRoutes).create(req, res);
});

router.put('/:id', checkIdParam(), checkBody(updateBeer), async (req: Request, res: Response) => {
  await container.get<BeerRoutesController>(ClassTypes.BeerRoutes).update(req, res);
});

router.delete('/:id', checkIdParam(), async (req: Request, res: Response) => {
  await container.get<BeerRoutesController>(ClassTypes.BeerRoutes).delete(req, res);
});

export default router;
