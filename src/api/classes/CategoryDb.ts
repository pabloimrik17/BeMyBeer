import { injectable } from 'inversify';
import 'reflect-metadata';
import { ICategoryDb } from '../interfaces/ICategoryDb';

@injectable()
export default class CategoryDb implements ICategoryDb {
  public idCategory: number;
  public name: string;
  public idParent: number;

  constructor() {
    this.idCategory = 0;
    this.name = '';
    this.idParent = 0;
  }
}
