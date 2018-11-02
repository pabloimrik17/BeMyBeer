import bodyParser from 'body-parser';
import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { ClassTypes } from './api/ioc/types';
import router from './api/routes/_routes';
import Database from './api/shared/Database';

require('dotenv').config();

@injectable()
export default class App {
  public readonly _app: Express;
  private readonly _port: number;
  private readonly _database: Database;

  constructor(@inject(ClassTypes.Database) database: Database) {
    this._app = express();
    this._app.use(bodyParser.json());
    this._app.use(bodyParser.urlencoded({ extended: false }));
    // this._app.use(expressValidator());
    this._app.use(process.env.API_ENTRY_POINT, router);

    this._port = parseInt(process.env.PORT, 10) || 3000;

    this._database = database;
  }

  async run() {
    try {
      await this._database.connect();
      // await this._database.migrateLatest();

      this._app.listen(this._port, () => {
        console.log(`App listeting on http://localhost:${this._port}`);
      });
    } catch (e) {
      console.error(e);
    }
  }
}