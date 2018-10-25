import express, { Request, Response, Router } from 'express';
import { validationResult } from 'express-validator/check';
import Category, { CategoryDb } from '../classes/Category.class';
import { checkBody, checkIdParam } from '../middleware/routes.middleware';
import { createCategory, updateCategory } from '../schemas/_category.schema';
import ApiResponser from '../shared/apiResponser/ApiResponser';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const category: Category = new Category();
    const categories: Array<CategoryDb> = await category.getAllDb<CategoryDb>();
    ApiResponser.responseSuccess(res, categories);
  } catch (error) {
    ApiResponser.responseError(res, error);
  }
});

router.get('/:id', checkIdParam(), async (req: Request, res: Response) => {
  const idCategory = parseInt(req.params.id, 10);

  try {
    validationResult(req).throw();
    const category = new Category(idCategory);
    const categoryResponse = await category.getDb<CategoryDb>();

    ApiResponser.responseSuccess(res, categoryResponse);
  } catch (error) {
    ApiResponser.responseError(res, error);
  }
});

router.post('/', checkBody(createCategory), async (req: Request, res: Response) => {
  try {
    validationResult(req).throw();

    const category = new Category();
    const categoryResponse = await category.save<CategoryDb>(req.body);

    ApiResponser.responseSuccess(res, categoryResponse);
  } catch (error) {
    ApiResponser.responseError(res, error);
  }
});

router.put('/:id', checkIdParam(), checkBody(updateCategory), async (req: Request, res: Response) => {
  try {
    validationResult(req).throw();
    const idCategory = parseInt(req.params.id, 10);

    const category = new Category(idCategory);
    const categoryResponse = await category.update<CategoryDb>(req.body);

    ApiResponser.responseSuccess(res, categoryResponse);
  } catch (error) {
    ApiResponser.responseError(res, error);
  }
});

router.delete('/:id', checkIdParam(), async (req: Request, res: Response) => {
  const idCategory = parseInt(req.params.id, 10);

  try {
    validationResult(req).throw();
    const category = new Category(idCategory);
    await category.delete();

    ApiResponser.responseSuccess(res);
  } catch (error) {
    ApiResponser.responseError(res, error);
  }
});

export default router;