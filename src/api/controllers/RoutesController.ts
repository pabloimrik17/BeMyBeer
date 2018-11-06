import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { ClassTypes } from '../ioc/types';
import ApiResponser from '../shared/apiResponser/ApiResponser';

@injectable()
export default abstract class RoutesController {
  @inject(ClassTypes.ApiResponser)
  private apiResponser: ApiResponser;

  public abstract async getAll(req: any, res: any): Promise<void>;

  public abstract async getById(req: any, res: any): Promise<void>;

  public abstract async create(req: any, res: any): Promise<void>;

  public abstract async update(req: any, res: any): Promise<void>;

  public abstract async delete(req: any, res: any): Promise<void>;
}
