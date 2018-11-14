import express, { NextFunction, Request, Response, Router } from 'express';
import CategoryRoutesController from '../controllers/CategoryRoutesController';
import { container } from '../ioc/ioc';
import { classTypes } from '../ioc/types';
import { checkBody, checkIdParam } from '../middleware/routes.middleware';
import { createCategory, updateCategory } from '../schemas/category.schema';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  await container.get<CategoryRoutesController>(classTypes.CategoryRoutesController).getAll(req, res);
});

router.get('/:id', checkIdParam(), async (req: Request, res: Response, next: NextFunction) => {
  await container.get<CategoryRoutesController>(classTypes.CategoryRoutesController).getById(req, res);
});

router.post('/', checkBody(createCategory), async (req: Request, res: Response, next: NextFunction) => {
  await container.get<CategoryRoutesController>(classTypes.CategoryRoutesController).create(req, res);
});

router.put('/:id', checkIdParam(), checkBody(updateCategory), async (req: Request, res: Response, next: NextFunction) => {
  await container.get<CategoryRoutesController>(classTypes.CategoryRoutesController).update(req, res);
});

router.delete('/:id', checkIdParam(), async (req: Request, res: Response, next: NextFunction) => {
  await container.get<CategoryRoutesController>(classTypes.CategoryRoutesController).delete(req, res);
});

export default router;
