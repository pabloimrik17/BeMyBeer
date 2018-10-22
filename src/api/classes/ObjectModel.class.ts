//https://stackoverflow.com/questions/43669697/dependency-injection-recommended-pattern-for-injecting-npm-modules
//https://medium.com/@samueleresca/inversion-of-control-and-dependency-injection-in-typescript-3040d568aabe

import apiErrors from '../shared/apiResponser/ApiErrors';
import Database, { database as importedDatabase } from '../shared/Database';
import DateModel from './DateModel';
import { DatabaseDate } from '../Interfaces/DatabaseDate';
import { inject, injectable } from 'inversify';
import { APPLICACION_TYPES, THIRD_PARTY_TYPES } from '../ioc/THIRD_PARTY_TYPES';
import { Lodash } from '../ioc/interfaces';
import IObjectModel from '../Interfaces/IObjectModel';
import AbstractObjectModel from './AbstractObjectModel';
import * as npmLodash from 'lodash';

@injectable()
export default class ObjectModel extends AbstractObjectModel implements IObjectModel {
    protected dbProperties: Array<string>;
    protected primaryKey: string;
    protected tableName: string;

    private _id: number;
    private _createdAt: string;
    private _updatedAt: string;

    private _database: Database;
    private _lodash: Lodash;

    constructor(id: number,
                @inject(APPLICACION_TYPES.Database) database: Database = importedDatabase,
                @inject(THIRD_PARTY_TYPES.Lodash) lodash: Lodash = npmLodash,
    ) {
        super();
        this._id = 0;
        this._createdAt = undefined;
        this._updatedAt = undefined;

        this._database = database;
        this._lodash = lodash;

        if (id > 0) {
            this._id = id;
        }
    }

    private static setDatabaseDates<T>(data: T & Object): T & DatabaseDate {
        return Object.assign(Object.create(data), data, {
            createdAt: DateModel.getCurrentDate(),
            updatedAt: DateModel.getCurrentDate(),
        });
    }

    private static setCreatedDate<T>(data: T & Object): T & DatabaseDate {
        return Object.assign(Object.create(data), data, { createdAt: DateModel.getCurrentDate() });
    }

    private static setUpdatedDate<T>(data: T & Object): T & DatabaseDate {
        return Object.assign(Object.create(data), data, { updatedAt: DateModel.getCurrentDate() });
    }

    public async getAllDb<T>(): Promise<Array<T>> {
        const sql: string = `
          SELECT ${this.getDbColumnsToQuery()}
          FROM ${this.tableName}
          ORDER BY ${this.primaryKey}   
        `;

        try {
            // TODO DI
            const [rows, columInfo]: [any, any] = await this._database.Pool.query(sql);
            return rows;
        } catch (error) {
            console.error(error);
            // TODO DI
            throw apiErrors.OBJECT_MODEL_GET_ALL;
        }
    }

    public async getDb<T>(): Promise<T> {
        const sql: string = `
      SELECT ${this.getDbColumnsToQuery()}
      FROM ${this.tableName}
      WHERE ${this.primaryKey} = ?
    `;

        try {
            const [rows, columnsInfo]: [any, any] = await this._database.Pool.query(sql, [this._id]);
            return rows[0];
        } catch (e) {
            console.error(e);
            throw apiErrors.OBJECT_MODEL_INIT_QUERY_ERROR;
        }
    }

    public async save<T>(data: T): Promise<T> {
        const sql: string = `
      INSERT INTO ${this.tableName}
      SET ?
    `;

        const insertData: T & DatabaseDate = ObjectModel.setDatabaseDates(this.parseDataToDb(data));

        try {
            const [result, error]: [any, any] = await this._database.Pool.query(sql, insertData);

            this._id = result.insertId;
            (<any>this)[this.primaryKey] = result.insertId;

            const insertedData: T = await this.getDb<T>();

            return insertedData;
        } catch (e) {
            console.error(e);
            throw apiErrors.OBJECT_MODEL_SAVE_QUERY_ERROR;
        }
    }

    public async update<T>(data: T): Promise<T> {
        if (this._id > 0) {
            const sql: string = `
            UPDATE ${this.tableName}
            SET ?
            WHERE ${this.primaryKey} = ?
        `;

            const updateData: T & DatabaseDate = ObjectModel.setUpdatedDate(this.parseDataToDb(data));

            try {
                await this._database.Pool.query(sql, [updateData, this._id]);

                const updatedData: T = await this.getDb<T>();

                return updatedData;
            } catch (e) {
                console.error(e);
                throw apiErrors.OBJECT_MODEL_UPDATE_QUERY_ERROR;
            }
        } else {
            console.error(apiErrors.OBJECT_MODEL_UPDATE_NO_ID);
            throw apiErrors.OBJECT_MODEL_UPDATE_NO_ID;
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
                await this._database.Pool.query(sql, [this._id]);
            } catch (e) {
                console.error(e);
                throw apiErrors.OBJECT_MODEL_DELETE_QUERY_ERROR;
            }

            this._id = 0;
            (<any>this)[this.primaryKey] = 0;
        } else {
            console.error(apiErrors.OBJECT_MODEL_UPDATE_NO_ID);
            throw apiErrors.OBJECT_MODEL_UPDATE_NO_ID;
        }
    }

    public prueba() {
        this._lodash.forEach([1, 2, 3, 4, 5], (item: number) => {
            console.log(item);
        });

        this._lodash.forEach([1, 2, 3, 4, 5], (item: number) => {
            console.log(item);
        });
    }

    private getDbColumnsToQuery(): string {
        return this.dbProperties.join(', ');
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
