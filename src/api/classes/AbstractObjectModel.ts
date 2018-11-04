import 'reflect-metadata';
import { injectable } from 'inversify';

@injectable()
export default abstract class AbstractObjectModel {
  protected abstract dbProperties: string[];
  protected abstract primaryKey: string;
  protected abstract tableName: string;

  protected constructor() {
  }
}
