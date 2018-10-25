import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export default class CategoryDb {
  public idCategory: number;
  public name: string;
  public idParent: number;

  constructor() {
    this.idCategory = 0;
    this.name = '';
    this.idParent = 0;
  }
}