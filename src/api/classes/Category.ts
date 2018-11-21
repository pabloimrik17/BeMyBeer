import { container } from '../ioc/ioc';
import { classTypes } from '../ioc/types';
import { apiErrors } from '../shared/apiResponser/ApiErrors';
import CategoryDb from './CategoryDb';
import DateModel from './DateModel';
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

  async delete(): Promise<void> {
    if (this.isValidId()) {
      const queryBeer: string = `
        UPDATE beer
        SET idCategory = NULL,
            updatedAt  = ?
        WHERE idCategory = ?
      `;

      const queryCategory: string = `
        UPDATE category
        SET idParent = NULL,
            updatedAt  = ?
        WHERE idParent = ?
      `;

      try {
        await this.database.Pool.query(queryBeer, [container.get<DateModel>(classTypes.DateModel).getCurrentDateTime(), this.Id]);
        await this.database.Pool.query(queryCategory, [container.get<DateModel>(classTypes.DateModel).getCurrentDateTime(), this.Id]);
        await super.delete();
      } catch (e) {
        throw new Error('CATEGORY DELETE QUERY TODO');
      }
    } else {
      throw new Error(apiErrors.CATEGORY.DELETE_NO_VALID_ID.message);
    }
  }
}
