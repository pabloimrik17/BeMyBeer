import { inject, injectable } from 'inversify';
import moment from 'moment';
import { Connection, ConnectionOptions } from 'mysql2/promise';
import 'reflect-metadata';
import DateModel from '../classes/DateModel';
import { Mysql2 } from '../ioc/interfaces';
import { NpmTypes } from '../ioc/types';

require('dotenv').config();

@injectable()
export default class Database {

  private _pool: Connection;
  private _mode: string;

  private _mysql2: Mysql2;

  constructor(@inject(NpmTypes.Mysql2)mysql2: Mysql2) {
    this._pool = undefined;
    this._mode = undefined;
    this._mysql2 = mysql2;
  }

  public get Pool(): Connection {
    return this._pool;
  }

  public static typeCast(field: any, next: () => void) {
    if (field.type === 'DATETIME') {
      return moment.utc(field.string(), DateModel.DATE_FORMAT).format();
    } else if (field.type === 'TIMESTAMP') {
      return moment.utc(field.string(), DateModel.DATE_FORMAT).format();
    } else if (field.type === 'DATE') {
      return moment.utc(field.string(), 'YYYY-MM-DD').format('YYYY-MM-DD');
    }

    return next();
  }

  public async connect(options?: ConnectionOptions): Promise<void> {
    const databaseOptions: ConnectionOptions = {
      database: process.env.CURRENT_ENVIROMENT === exports.MODE_PRODUCTION
        ? process.env.PROD_DATABASE_NAME
        : process.env.TEST_DATABASE_NAME,
    };

    const mergedOptions: ConnectionOptions = Object.assign({}, defaultConnectionOptions, databaseOptions, options);

    this._pool = await this._mysql2.createConnection(mergedOptions);
    this._mode = process.env.CURRENT_ENVIROMENT;
  }
}

export const defaultConnectionOptions: ConnectionOptions = {
  host: process.env.DATABASE_HOST_IP,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.TEST_DATABASE_NAME,
  connectTimeout: 3000,
  timezone: process.env.TIMEZONE,
  typeCast: (field, next) => Database.typeCast(field, next),
};