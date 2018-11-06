// https://stackoverflow.com/questions/43669697/dependency-injection-recommended-pattern-for-injecting-npm-modules
// https://medium.com/@samueleresca/inversion-of-control-and-dependency-injection-in-typescript-3040d568aabe

import { inject } from 'inversify';
import 'reflect-metadata';
import { IDatabaseDate } from '../Interfaces/IDatabaseDate';
import IObjectModel from '../Interfaces/IObjectModel';
import { classTypes } from '../ioc/types';
import { apiErrors } from '../shared/apiResponser/ApiErrors';
import Database from '../shared/Database';
import AbstractObjectModel from './AbstractObjectModel';
import DateModel from './DateModel';

export default class ObjectModel extends AbstractObjectModel implements IObjectModel {
  protected dbProperties: string[] = [];
  protected primaryKey: string = '';
  protected tableName: string = '';

  private id: number;
  private createdAt: string;
  private updatedAt: string;

  @inject(classTypes.Database)
  private database: Database;
  @inject(classTypes.DateModel)
  private dateModel: DateModel;

  constructor(id: number = 0) {
    super();
    this.id = 0;
    this.createdAt = undefined;
    this.updatedAt = undefined;

    if (id > 0) {
      this.id = id;
    }
  }

  public async getDb<T>(): Promise<T> {
    if (this.isValidId()) {
      const sql: string = `
          SELECT ${this.getDbColumnsToQuery()}
          FROM ${this.tableName}
          WHERE ${this.primaryKey} = ?
        `;

      try {
        const [rows, columnsInfo]: [any, any] = await this.Database.Pool.query(sql, [this.Id]);
        return rows[0];
      } catch (e) {
        // TODO DI
        console.error(e);
        throw new Error(apiErrors.OBJECT_MODEL.GET_QUERY.message);
      }
    } else {
      throw new Error(apiErrors.OBJECT_MODEL.COMMON_NO_ID.message);
    }
  }

  public get Database(): Database {
    return this.database;
  }

  public set Database(value: Database) {
    this.database = value;
  }

  public get DateModel(): DateModel {
    return this.dateModel;
  }

  public set DateModel(value: DateModel) {
    this.dateModel = value;
  }

  public get Id(): number {
    return (<any>this)[this.primaryKey] || this.id;
  }

  public set Id(value: number) {
    if ((<any>this)[this.primaryKey] !== undefined) {
      (<any>this)[this.primaryKey] = value;
    }

    this.id = value;
  }

  public async update<T>(data: T): Promise<T> {
    if (this.isValidId()) {
      const sql: string = `
                UPDATE ${this.tableName}
                SET ?
                WHERE ${this.primaryKey} = ?
            `;

      const updateData: T & IDatabaseDate = this.setUpdatedDate(this.parseDataToDb(data));

      try {
        await this.Database.Pool.query(sql, [updateData, this.Id]);

        return await this.getDb<T>();
      } catch (e) {
        console.error(e);
        throw new Error(apiErrors.OBJECT_MODEL.UPDATE_QUERY.message);
      }
    } else {
      console.error(apiErrors.OBJECT_MODEL.COMMON_NO_ID);
      throw new Error(apiErrors.OBJECT_MODEL.COMMON_NO_ID.message);
    }
  }

  public async getAllDb<T>(): Promise<T[]> {
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

    const insertData: T & IDatabaseDate = this.setDatabaseDates(this.parseDataToDb(data));

    try {
      const [result, error]: [any, any] = await this.Database.Pool.query(sql, insertData);

      this.Id = result.insertId;
      (<any>this)[this.primaryKey] = result.insertId;

      return await this.getDb<T>();
    } catch (e) {
      console.error(e);
      throw new Error(apiErrors.OBJECT_MODEL.SAVE_QUERY.message);
    }
  }

  public async delete(): Promise<void> {
    if (this.isValidId()) {
      const sql: string = `
              DELETE
              FROM ${this.tableName}
              WHERE ${this.primaryKey} = ?
            `;

      try {
        await this.Database.Pool.query(sql, [this.Id]);
      } catch (e) {
        console.error(e);
        throw new Error(apiErrors.OBJECT_MODEL.DELETE_QUERY.message);
      }

      this.Id = 0;
      (<any>this)[this.primaryKey] = 0;
    } else {
      console.error(apiErrors.OBJECT_MODEL.COMMON_NO_ID);
      throw new Error(apiErrors.OBJECT_MODEL.COMMON_NO_ID.message);
    }
  }

  private isValidId(): boolean {
    return Number.isInteger(this.Id) && this.Id > 0;
  }

  private setDatabaseDates<T>(data: T & Object): T & IDatabaseDate {
    const currentDate: string = this.DateModel.getCurrentDate();

    return Object.assign(Object.create(data), data, {
      createdAt: currentDate,
      updatedAt: currentDate,
    });
  }

  private setUpdatedDate<T>(data: T & Object): T & IDatabaseDate {
    return Object.assign(Object.create(data), data, { updatedAt: this.DateModel.getCurrentDate() });
  }

  private getDbColumnsToQuery(): string {
    return this.dbProperties && this.dbProperties.length > 0
      ? this.dbProperties.join(', ')
      : '';
  }

  private parseDataToDb<T>(data: T) {
    const dataToUpdate: T = Object.assign({}, data);

    Object.keys(dataToUpdate).forEach((key: string) => {
      if (!this.dbProperties.includes(key)) {
        delete (<any>dataToUpdate)[key];
      }
    });

    return dataToUpdate;
  }
}
