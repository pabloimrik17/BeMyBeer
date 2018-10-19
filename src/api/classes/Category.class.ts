import ObjectModel from './ObjectModel.class';
import {inject, injectable} from 'inversify'
import {THIRD_PARTY_TYPES} from '../ioc/THIRD_PARTY_TYPES'
import {Lodash} from '../ioc/interfaces'
import * as npmLodash from 'lodash'

// DB DEFINITIONS

export class CategoryDb {
  idCategory: number;
  name: string;
  idParent: number;

  constructor () {
    this.idCategory = 0
    this.name = ''
    this.idParent = 0
  }
}

@injectable()
export default class Category extends ObjectModel {
  protected dbProperties: Array<string> = Object.keys(new CategoryDb());
  protected primaryKey: string = 'idCategory';
  protected tableName: string = 'category';

  public idCategory: number
  public idParent: number
  public name: string

  constructor(idCategory = 0, @inject(THIRD_PARTY_TYPES.Lodash) lodash: Lodash = npmLodash) {
    super(idCategory, lodash)
    this.idCategory = 0;
    this.name = '';
    this.idParent = 0;

    if (idCategory > 0) {
      this.idCategory = idCategory;
    }
  }
}