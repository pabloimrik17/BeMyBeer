import bodyParser from 'body-parser'
import {Express} from 'express'
import express from 'express';
import expressValidator from 'express-validator';
import Database from './api/shared/Database'
import router from './api/routes/_routes'

require('dotenv').config();

export default class App {
  private readonly app: Express
  private readonly port: number
  private readonly db: Database

  constructor () {
    this.app = express()
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({extended: false}))
    this.app.use(expressValidator())
    this.app.use(process.env.API_ENTRY_POINT, router)

    this.port = parseInt(process.env.PORT) || 3000;

    this.db = new Database();
  }

  async run () {
    try {
      await this.db.connect(process.env.CURRENT_ENVIROMENT)
      this.app.listen(this.port, () => {
        console.log(`App listeting on http://localhost:${this.port}`);
      });
    } catch (e) {
      console.error(e);
    }
  }
}