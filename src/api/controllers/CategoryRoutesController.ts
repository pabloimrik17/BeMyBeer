import { validationResult } from 'express-validator/check';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import Beer from '../classes/Beer';
import Category from '../classes/Category';
import CategoryDb from '../classes/CategoryDb';
import { container } from '../ioc/ioc';
import { classTypes } from '../ioc/types';
import { apiErrors } from '../shared/apiResponser/ApiErrors';
import ApiResponser from '../shared/apiResponser/ApiResponser';
import RoutesController from './RoutesController';

@injectable()
export default class CategoryRoutesController extends RoutesController {
  @inject(classTypes.Beer)
  private beer: Beer;

  async getAll(req: any, res: any): Promise<void> {
    try {
      const categories: CategoryDb[] = await container.get<Category>(classTypes.Category).getAllDb<CategoryDb>();
      await ApiResponser.responseSuccess(res, categories);
    } catch (error) {
      ApiResponser.responseError(res, apiErrors.OBJECT_MODEL.GET_ALL_QUERY);
    }
  }

  async create(req: any, res: any): Promise<void> {
    try {
      validationResult(req).throw();

      const category = container.get<Category>(classTypes.Category);
      const categoryResponse = await category.save<CategoryDb>(req.body);

      await ApiResponser.responseSuccess(res, categoryResponse);
    } catch (error) {
      ApiResponser.responseError(res, apiErrors.OBJECT_MODEL.SAVE_QUERY);
    }
  }

  async delete(req: any, res: any): Promise<void> {
    try {
      validationResult(req).throw();

      const idCategory = parseInt(req.params.id, 10);
      const category = container.get<Category>(classTypes.Category);
      category.Id = idCategory;
      await category.delete();

      await ApiResponser.responseSuccess(res);
    } catch (error) {
      ApiResponser.responseError(res, apiErrors.ROUTES.NO_VALID_ID_PARAM);
    }
  }

  async getById(req: any, res: any): Promise<void> {
    try {
      validationResult(req).throw();

      const idCategory = parseInt(req.params.id, 10);
      const category = container.get<Category>(classTypes.Category);
      category.Id = idCategory;
      const categoryResponse = await category.getDb<CategoryDb>();

      await ApiResponser.responseSuccess(res, categoryResponse);
    } catch (error) {
      ApiResponser.responseError(res, apiErrors.ROUTES.NO_VALID_ID_PARAM);
    }
  }

  async update(req: any, res: any): Promise<void> {
    try {
      validationResult(req).throw();
      const idCategory = parseInt(req.params.id, 10);

      const category = container.get<Category>(classTypes.Category);
      category.Id = idCategory;
      const categoryResponse = await category.update<CategoryDb>(req.body);

      await ApiResponser.responseSuccess(res, categoryResponse);
    } catch (error) {
      ApiResponser.responseError(res, apiErrors.OBJECT_MODEL.UPDATE_QUERY);
    }
  }
}
