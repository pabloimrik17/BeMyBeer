import { inject, injectable } from 'inversify';
import moment from 'moment';
import { Connection, ConnectionOptions } from 'mysql2/promise';
import 'reflect-metadata';
import DateModel from '../classes/DateModel';
import { Knex, Moment, Mysql2 } from '../ioc/interfaces';
import { NpmTypes } from '../ioc/types';

require('dotenv').config();

@injectable()
export default class Database {

  private _pool: Connection;
  private _mode: string;

  private _mysql2: Mysql2;
  private _moment: Moment;
  private _knex: any & Knex;

  constructor(@inject(NpmTypes.Mysql2) mysql2: Mysql2,
              @inject(NpmTypes.Knex) knex: Knex,
              @inject(NpmTypes.Moment) moment: Moment) {
    this._pool = undefined;
    this._mode = undefined;

    this._mysql2 = mysql2;
    this._moment = moment;
    this._knex = knex;
  }

  public get Pool(): Connection {
    return this._pool;
  }

  public static databaseConnectionOption(): ConnectionOptions {
    return {
      database: process.env.CURRENT_ENVIROMENT === process.env.PROD_ENVIROMENT
        ? process.env.PROD_DATABASE_NAME
        : process.env.TEST_DATABASE_NAME,
    };
  }

  public async connect(options?: ConnectionOptions): Promise<void> {
    const mergedOptions: ConnectionOptions = Object.assign({}, defaultConnectionOptions, Database.databaseConnectionOption(), options);

    this._pool = await this._mysql2.createConnection(mergedOptions);
    this._mode = process.env.CURRENT_ENVIROMENT;
  }

  public async migrateLatest() {
    await this._knex.migrate.latest();
  }
}

export const defaultConnectionOptions: ConnectionOptions = {
  host: process.env.DATABASE_HOST_IP,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  connectTimeout: 3000,
  timezone: process.env.TIMEZONE,
  typeCast: (field, next) => {
    if (field.type === 'DATETIME') {
      return moment.utc(field.string(), DateModel.DATE_FORMAT).format();
    } else if (field.type === 'TIMESTAMP') {
      return moment.utc(field.string(), DateModel.DATE_FORMAT).format();
    } else if (field.type === 'DATE') {
      return moment.utc(field.string(), 'YYYY-MM-DD').format('YYYY-MM-DD');
    }

    return next();
  },
};