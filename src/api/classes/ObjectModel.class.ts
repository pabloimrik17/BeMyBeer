import apiErrors from '../shared/apiResponser/ApiErrors';
import {database} from '../shared/Database';
import {FieldPacket} from 'mysql2/promise';
import * as moment from 'moment';


export default abstract class ObjectModel {
  protected abstract readonly dbProperties: Array<string>;
  protected abstract readonly primaryKey: string;
  protected abstract readonly tableName: string;

  private id: number;
  private createdAt: string;
  private updatedAt: string;

  protected constructor (id: number) {
    this.id = 0;
    this.createdAt = null;
    this.updatedAt = null;

    if (id > 0) {
      this.id = id;
    }
  }

  protected abstract init (data: any): void;

  protected abstract get (): any

  private getCurrentDate (): string {
    return moment.utc().format('YYYY-MM-DD HH:mm:ss');
  }

  private getDbColumnsToQuery (): string {
    return this.dbProperties.join(', ')
  }

  private async getAllDb (): Promise<Array<any>> {
    const sql: string = `
          SELECT ${this.getDbColumnsToQuery()}
          FROM ${this.tableName}
          ORBER BY ${this.primaryKey}   
        `;

    try {
      // TODO DI
      const [error, rows]: [any, FieldPacket[]] = await database.Pool.query(sql);
      return rows
    } catch (error) {
      console.error(error);
      // TODO DI
      throw apiErrors.OBJECT_MODEL_GET_ALL;
    }
  }

  private async getDb (): Promise<any> {
    const sql: string = `
      SELECT ${this.getDbColumnsToQuery()}
      FROM ${this.tableName}
      WHERE ${this.primaryKey} = ?
    `;

    try {
      const [error, rows]: [any, FieldPacket[]] = await database.Pool.query(sql, [this.id]);
      return rows[0]
    } catch (e) {
      console.error(e);
      throw apiErrors.OBJECT_MODEL_INIT_QUERY_ERROR;
    }
  }

  public async save (): Promise<void> {
    const sql: string = `
      INSERT INTO ${this.tableName}
      SET ?
    `;

    const insertData = this.get()

    insertData.createdAt = this.getCurrentDate();
    insertData.updatedAt = insertData.createdAt;

    try {
      const [result, fields]: [any, any] = await database.Pool.query(sql, insertData)

      this.id = result[0].insertId;
      (<any>this)[this.primaryKey] = result[0].insertId;

      await this.get();
    } catch (e) {
      console.error(e);
      throw apiErrors.OBJECT_MODEL_SAVE_QUERY_ERROR;
    }
  }

  public async update<T> (updateData: T): Promise<void> {
    const sql: string = `
            UPDATE ${this.tableName}
            SET ?
            WHERE ${this.primaryKey} = ?
        `;

    const _dataToUpdate: { [key: string]: any } = Object.assign({}, updateData);

    Object.keys(updateData).forEach((key: string) => {
      if (!this.dbProperties.includes(key)) {
        delete _dataToUpdate[key];
      }
    });

    _dataToUpdate.updatedAt = this.getCurrentDate();

    try {
      await database.Pool.query(sql, [updateData, this.id]);

      await this.get();
    } catch (e) {
      console.error(e);
      throw apiErrors.OBJECT_MODEL_UPDATE_QUERY_ERROR;
    }
  }

  public async delete (): Promise<void> {
    const sql: string = `
      DELETE
      FROM ${this.tableName}
      WHERE ${this.primaryKey} = ?
    `;

    try {
      await database.Pool.query(sql, [this.id]);
    } catch (e) {
      console.error(e);
      throw apiErrors.OBJECT_MODEL_DELETE_QUERY_ERROR;
    }

    this.id = 0;
    (<any>this)[this.primaryKey] = 0;
  }
}
