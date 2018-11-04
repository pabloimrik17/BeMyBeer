import CategoryDb from './CategoryDb';
import ObjectModel from './ObjectModel';

export default class Category extends ObjectModel {
  public idCategory: number;
  public idParent: number;
  public name: string;
  protected dbProperties: string[] = Object.keys(new CategoryDb());
  protected primaryKey: string = 'idCategory';
  protected tableName: string = 'category';

  constructor() {
    super();
    this.idCategory = 0;
    this.name = '';
    this.idParent = 0;
  }
}
