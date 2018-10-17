import ObjectModel from './ObjectModel.class';

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

export default class Category extends ObjectModel {
  protected dbProperties: Array<string> = Object.keys(new CategoryDb());
  protected primaryKey: string = 'idCategory';
  protected tableName: string = 'category';

  public idCategory: number
  public idParent: number
  public name: string

  constructor (idCategory = 0) {
    super(idCategory);
    this.idCategory = 0;
    this.name = '';
    this.idParent = 0;

    if (idCategory > 0) {
      this.idCategory = idCategory;
    }
  }
}