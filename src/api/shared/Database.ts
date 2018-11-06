import { inject, injectable } from 'inversify';
import moment from 'moment';
import { Connection, ConnectionOptions } from 'mysql2/promise';
import 'reflect-metadata';
import DateModel from '../classes/DateModel';
import { Moment, Mysql2 } from '../ioc/interfaces';
import { npmTypes } from '../ioc/types';

require('dotenv').config();

@injectable()
export default class Database {

  private pool: Connection;
  private mode: string;

  private mysql2: Mysql2;
  private moment: Moment;

  constructor(@inject(npmTypes.Mysql2) mysql2: Mysql2,
              @inject(npmTypes.Moment) moment: Moment) {
    this.pool = undefined;
    this.mode = undefined;

    this.mysql2 = mysql2;
    this.moment = moment;
  }

  public get Pool(): Connection {
    return this.pool;
  }

  public static databaseConnectionOption(): ConnectionOptions {
    return {
      database: process.env.CURRENT_ENVIROMENT === process.env.PROD_ENVIROMENT
        ? process.env.PROD_DATABASE_NAME
        : process.env.TEST_DATABASE_NAME,
    };
  }

  public async connect(options?: ConnectionOptions): Promise<void> {
    const mergedOptions: ConnectionOptions = Object.assign(
      {},
      defaultConnectionOptions,
      Database.databaseConnectionOption(),
      options,
    );

    this.pool = await this.mysql2.createConnection(mergedOptions);
    this.mode = process.env.CURRENT_ENVIROMENT;
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
    }
    if (field.type === 'TIMESTAMP') {
      return moment.utc(field.string(), DateModel.DATE_FORMAT).format();
    }
    if (field.type === 'DATE') {
      return moment.utc(field.string(), 'YYYY-MM-DD').format('YYYY-MM-DD');
    }

    return next();
  },
};
