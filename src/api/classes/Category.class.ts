import ObjectModel from './ObjectModel.class';

// DB DEFINITIONS

abstract class CategoryDb {
  idCategory: number;
  name: string;
  idParent: number;
}

class Category extends ObjectModel implements CategoryDb {
  protected readonly primaryKey: string = 'idCategory';
  protected readonly tableName: string = 'category';
  protected readonly dbProperties: Array<string> = Object.keys(new Category());

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

  async getAll (): Promise<Array<CategoryDb>> {
    return super.getAll();
  }


  protected init (data: any): void {
  }
}

module.exports = Category;
