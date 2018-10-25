// https://stackoverflow.com/questions/43669697/dependency-injection-recommended-pattern-for-injecting-npm-modules
// https://medium.com/@samueleresca/inversion-of-control-and-dependency-injection-in-typescript-3040d568aabe


import { inject } from 'inversify';
import 'reflect-metadata';
import { DatabaseDate } from '../Interfaces/DatabaseDate';
import IObjectModel from '../Interfaces/IObjectModel';
import { ClassTypes } from '../ioc/types';
import { apiErrors } from '../shared/apiResponser/ApiErrors';
import Database from '../shared/Database';
import AbstractObjectModel from './AbstractObjectModel';
import DateModel from './DateModel';

export default class ObjectModel extends AbstractObjectModel implements IObjectModel {
  protected dbProperties: Array<string> = [];
  protected primaryKey: string = '';
  protected tableName: string = '';

  private _id: number;
  private _createdAt: string;
  private _updatedAt: string;

  @inject(ClassTypes.Database)
  private _database: Database;
  @inject(ClassTypes.DateModel)
  private _dateModel: DateModel;

  constructor(id: number = 0) {
    super();
    this._id = 0;
    this._createdAt = undefined;
    this._updatedAt = undefined;

    if (id > 0) {
      this._id = id;
    }
  }

  get Database(): Database {
    return this._database;
  }

  set Database(value: Database) {
    this._database = value;
  }

  get DateModel(): DateModel {
    return this._dateModel;
  }

  set DateModel(value: DateModel) {
    this._dateModel = value;
  }

  public async getDb<T>(): Promise<T> {
    const sql: string = `
          SELECT ${this.getDbColumnsToQuery()}
          FROM ${this.tableName}
          WHERE ${this.primaryKey} = ?
        `;

    try {
      const [rows, columnsInfo]: [any, any] = await this.Database.Pool.query(sql, [this._id]);
      return rows[0];
    } catch (e) {
      // TODO DI
      console.error(e);
      throw new Error(apiErrors.OBJECT_MODEL.GET_QUERY.message);
    }
  }

  public async getAllDb<T>(): Promise<Array<T>> {
    const sql: string = `
          SELECT ${this.getDbColumnsToQuery()}
          FROM ${this.tableName}
          ORDER BY ${this.primaryKey}
        `;

    try {
      const [rows, columInfo]: [any, any] = await this.Database.Pool.query(sql);
      return rows;
    } catch (error) {
      console.error(error);
      // TODO DI
      throw new Error(apiErrors.OBJECT_MODEL.GET_ALL_QUERY.message);
    }
  }

  public async save<T>(data: T): Promise<T> {
    const sql: string = `
          INSERT INTO ${this.tableName}
          SET ?
        `;

    const insertData: T & DatabaseDate = this._setDatabaseDates(this.parseDataToDb(data));

    try {
      const [result, error]: [any, any] = await this.Database.Pool.query(sql, insertData);

      this._id = result.insertId;
      (<any>this)[this.primaryKey] = result.insertId;

      const insertedData: T = await this.getDb<T>();

      return insertedData;
    } catch (e) {
      console.error(e);
      throw new Error(apiErrors.OBJECT_MODEL.SAVE_QUERY.message);
    }
  }

  public async update<T>(data: T): Promise<T> {
    if (this._id > 0) {
      const sql: string = `
                UPDATE ${this.tableName}
                SET ?
                WHERE ${this.primaryKey} = ?
            `;

      const updateData: T & DatabaseDate = this._setUpdatedDate(this.parseDataToDb(data));

      try {
        await this.Database.Pool.query(sql, [updateData, this._id]);

        const updatedData: T = await this.getDb<T>();

        return updatedData;
      } catch (e) {
        console.error(e);
        throw new Error(apiErrors.OBJECT_MODEL.UPDATE_QUERY.message);
      }
    } else {
      console.error(apiErrors.OBJECT_MODEL.COMMON_NO_ID);
      throw new Error(apiErrors.OBJECT_MODEL.COMMON_NO_ID.message);
    }
  }

  public async delete(): Promise<void> {
    if (this._id > 0) {
      const sql: string = `
              DELETE
              FROM ${this.tableName}
              WHERE ${this.primaryKey} = ?
            `;

      try {
        await this.Database.Pool.query(sql, [this._id]);
      } catch (e) {
        console.error(e);
        throw new Error(apiErrors.OBJECT_MODEL.DELETE_QUERY.message);
      }

      this._id = 0;
      (<any>this)[this.primaryKey] = 0;
    } else {
      console.error(apiErrors.OBJECT_MODEL.COMMON_NO_ID);
      throw new Error(apiErrors.OBJECT_MODEL.COMMON_NO_ID.message);
    }
  }

  private _setDatabaseDates<T>(data: T & Object): T & DatabaseDate {
    const currentDate: string = this.DateModel.getCurrentDate();

    return Object.assign(Object.create(data), data, {
      createdAt: currentDate,
      updatedAt: currentDate,
    });
  }

  private _setUpdatedDate<T>(data: T & Object): T & DatabaseDate {
    return Object.assign(Object.create(data), data, { updatedAt: this.DateModel.getCurrentDate() });
  }

  private getDbColumnsToQuery(): string {
    return this.dbProperties && this.dbProperties.length > 0
      ? this.dbProperties.join(', ')
      : '';
  }

  private parseDataToDb<T>(data: T) {
    const _dataToUpdate: T = Object.assign({}, data);

    Object.keys(_dataToUpdate).forEach((key: string) => {
      if (!this.dbProperties.includes(key)) {
        delete (<any>_dataToUpdate)[key];
      }
    });

    return _dataToUpdate;
  }
}
