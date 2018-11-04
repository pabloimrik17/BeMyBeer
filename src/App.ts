import bodyParser from 'body-parser';
import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { ClassTypes } from './api/ioc/types';
import routes from './api/routes/routes';
import Database from './api/shared/Database';

require('dotenv').config();

@injectable()
export default class App {
  public readonly app: Express;
  private readonly port: number;
  private readonly database: Database;

  constructor(@inject(ClassTypes.Database) database: Database) {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    // this.app.use(expressValidator());
    this.app.use(process.env.API_ENTRY_POINT, routes);

    this.port = parseInt(process.env.PORT, 10) || 3000;
    this.database = database;
  }

  async run() {
    try {
      await this.database.connect();
      // await this.database.migrateLatest();

      this.app.listen(this.port, () => {
        console.log(`App listeting on http://localhost:${this.port}`);
      });
    } catch (e) {
      console.error(e);
    }
  }
}
