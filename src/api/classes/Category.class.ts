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

export class Category extends ObjectModel implements CategoryDb {
  protected primaryKey: string = 'idCategory';
  protected tableName: string = 'category';
  protected dbProperties: Array<string> = Object.keys(new CategoryDb());

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