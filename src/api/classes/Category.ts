import CategoryDb from './CategoryDb';
import ObjectModel from './ObjectModel';
import DateModel from './DateModel';
import { classTypes } from '../ioc/types';
import { container } from '../ioc/ioc';

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
      const query: string = `
        UPDATE beer
        SET idCategory = NULL,
            updatedAt  = ?
        WHERE idCategory = ?
      `;

      try {
        await this.database.Pool.query(query, [container.get<DateModel>(classTypes.DateModel).getCurrentDate(), this.Id],
        );
        await super.delete();
      } catch (e) {
        throw new Error('TODO');
      }
    }
  }
}
