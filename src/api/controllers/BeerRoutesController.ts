import { validationResult } from 'express-validator/check';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import Beer from '../classes/Beer';
import BeerDb from '../classes/BeerDb';
import { classTypes } from '../ioc/types';
import { apiErrors } from '../shared/apiResponser/ApiErrors';
import ApiResponser from '../shared/apiResponser/ApiResponser';
import RoutesController from './RoutesController';

@injectable()
export default class BeerRoutesController extends RoutesController {
  @inject(classTypes.Beer)
  private beer: Beer;

  async getAll(req: any, res: any): Promise<void> {
    try {
      const beers = await this.beer.getAllDb<BeerDb>();
      await ApiResponser.responseSuccess(res, beers);
    } catch (error) {
      ApiResponser.responseError(res, apiErrors.OBJECT_MODEL.GET_ALL_QUERY);
    }
  }

  async create(req: any, res: any): Promise<void> {
    try {
      const beerResponse = await this.beer.save<BeerDb>(req.body);

      await ApiResponser.responseSuccess(res, beerResponse);
    } catch (error) {
      ApiResponser.responseError(res, apiErrors.OBJECT_MODEL.SAVE_QUERY);
    }
  }

  async delete(req: any, res: any): Promise<void> {
    try {
      validationResult(req).throw();

      this.beer.Id = parseInt(req.params.id, 10);
      await this.beer.delete();

      await ApiResponser.responseSuccess(res);
    } catch (error) {
      ApiResponser.responseError(res, apiErrors.ROUTES.NO_VALID_ID_PARAM);
    }
  }

  async getById(req: any, res: any): Promise<void> {
    try {
      validationResult(req).throw();

      this.beer.Id = parseInt(req.params.id, 10);
      const beerResponse = await this.beer.getDb<BeerDb>();

      await ApiResponser.responseSuccess(res, beerResponse);
    } catch (error) {
      ApiResponser.responseError(res, apiErrors.ROUTES.NO_VALID_ID_PARAM);
    }
  }

  async update(req: any, res: any): Promise<void> {
    try {
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        this.beer.Id = parseInt(req.params.id, 10);
        const beerResponse = await this.beer.update<BeerDb>(req.body);

        await ApiResponser.responseSuccess(res, beerResponse);
      }
    } catch (error) {
      ApiResponser.responseError(res, apiErrors.OBJECT_MODEL.UPDATE_QUERY);
    }
  }
}
