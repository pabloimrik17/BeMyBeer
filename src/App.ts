import bodyParser from 'body-parser'
import {Express} from 'express'
import express from 'express';
import expressValidator from 'express-validator';
//const db = require('./api/shared/database');
//const routes = require('./api/routes/routes');

require('dotenv').config();

export default class App {
  private readonly app: Express
  private readonly port: number
  private readonly db: Object

  constructor () {
    this.app = express()
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({extended: false}))
    this.app.use(expressValidator())
    //this.app.use(process.env.API_ENTRY_POINT, routes)

    this.port = parseInt(process.env.PORT) || 3000;

    //this.db = db
  }

  async run () {
    try {
      //await this.db.connect(process.env.CURRENT_ENVIROMENT)
      this.app.listen(this.port, () => {
        console.log(`App listeting on http://localhost:${this.port}`);
      });
    } catch (e) {
      console.error(e);
    }
  }
}