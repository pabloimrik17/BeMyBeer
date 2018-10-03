import mysql, {Connection} from 'mysql2/promise'
import moment from 'moment'

export default class Database {
  pool: Connection;
  mode: string

  constructor () {
    this.pool = null
    this.mode = null
  }

  get Pool (): Connection {
    return this.pool
  }

  public async connect (mode: string): Promise<void> {
    this.pool = await mysql.createConnection({
      host: process.env.DATABASE_HOST_IP,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: mode === exports.MODE_PRODUCTION
        ? process.env.PROD_DATABASE_NAME
        : process.env.TEST_DATABASE_NAME,
      connectTimeout: 3000,
      timezone: process.env.TIMEZONE,
      typeCast: (field, next) => {
        if (field.type === 'DATETIME') {
          return moment.utc(field.string(), 'YYYY-MM-DD HH:mm:ss').format();
        } else if (field.type === 'TIMESTAMP') {
          return moment.utc(field.string(), 'YYYY-MM-DD HH:mm:ss').format();
        } else if (field.type === 'DATE') {
          return moment.utc(field.string(), 'YYYY-MM-DD').format('YYYY-MM-DD');
        }

        return next();
      },
    });
    this.mode = mode
  }
}