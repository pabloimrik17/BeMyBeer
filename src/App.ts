import bodyParser from 'body-parser';
import express, { Express } from 'express';
import expressValidator from 'express-validator';
import { container } from './api/ioc/ioc';
import { ClassTypes } from './api/ioc/types';
import router from './api/routes/_routes';
import Database from './api/shared/Database';

require('dotenv').config();

export default class App {
  private readonly app: Express;
  private readonly port: number;
  private readonly db: Database;

  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(expressValidator());
    this.app.use(process.env.API_ENTRY_POINT, router);

    this.port = parseInt(process.env.PORT) || 3000;

    // this.db = new Database();
    this.db = container.get<Database>(ClassTypes.Database);
  }

  async run() {
    try {
      await this.db.connect();
      this.app.listen(this.port, () => {
        console.log(`App listeting on http://localhost:${this.port}`);
      });
    } catch (e) {
      console.error(e);
    }
  }
}