import { validationResult } from 'express-validator/check';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import Beer from '../classes/Beer';
import BeerDb from '../classes/BeerDb';
import { classTypes } from '../ioc/types';
import ApiResponser from '../shared/apiResponser/ApiResponser';
import RoutesController from './RoutesController';

@injectable()
export default class BeerRoutesController extends RoutesController {
  @inject(classTypes.Beer)
  private beer: Beer;

  async getAll(req: any, res: any): Promise<void> {
    try {
      const beers = await this.beer.getAllDb<BeerDb>();
      ApiResponser.responseSuccess(res, beers);
    } catch (error) {
      ApiResponser.responseError(res, error);
    }
  }

  async create(req: any, res: any): Promise<void> {
    try {
      validationResult(req).throw();
      const beerResponse = await this.beer.save<BeerDb>(req.body);

      ApiResponser.responseSuccess(res, beerResponse);
    } catch (error) {
      ApiResponser.responseError(res, error);
    }
  }

  async delete(req: any, res: any): Promise<void> {
    const idBeer = parseInt(req.params.id, 10);

    try {
      validationResult(req).throw();
      this.beer.Id = idBeer;
      await this.beer.delete();

      ApiResponser.responseSuccess(res);
    } catch (error) {
      ApiResponser.responseError(res, error);
    }
  }

  async getById(req: any, res: any): Promise<void> {
    const idBeer = parseInt(req.params.id, 10);

    try {
      validationResult(req).throw();
      this.beer.Id = idBeer;
      const beerResponse = await this.beer.getDb<BeerDb>();

      ApiResponser.responseSuccess(res, beerResponse);
    } catch (error) {
      ApiResponser.responseError(res, error);
    }
  }

  async update(req: any, res: any): Promise<void> {
    try {
      validationResult(req).throw();

      this.beer.Id = parseInt(req.params.id, 10);
      const beerResponse = await this.beer.update<BeerDb>(req.body);

      ApiResponser.responseSuccess(res, beerResponse);
    } catch (error) {
      ApiResponser.responseError(res, error);
    }
  }
}
