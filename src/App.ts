import { OptionsUrlencoded } from 'body-parser';
import { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { BodyParser } from './api/ioc/interfaces';
import { classTypes, npmTypes } from './api/ioc/types';
import routes from './api/routes/routes';
import { apiErrors } from './api/shared/apiResponser/ApiErrors';
import Database from './api/shared/Database';
import EnviromentVariableHandler from './api/shared/EnviromentVariableHandler';

require('dotenv').config();

@injectable()
export default class App {
  public static readonly urlEncodedConfig: OptionsUrlencoded = { extended: false };

  private server: Server;
  public readonly app: Express;
  private readonly port: number;
  private readonly database: Database;

  constructor(@inject(classTypes.Database) database: Database,
              @inject(npmTypes.Express) express: Express,
              @inject(npmTypes.BodyParser) bodyParser: BodyParser) {

    this.app = express;
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded(App.urlEncodedConfig));
    // app.use(compression());
    // app.use(logger('common', {
    //   stream: fs.createWriteStream('./access.log', {flags: 'a'})
    // }));
    //
    // app.use(logger('dev'));NODE_ENV

    // this.app.use(expressValidator());

    this.app.use(process.env.API_ENTRY_POINT, routes);

    // const wantedEnvironment: string = process.env.NODE_ENV === process.env.TEST_ENV
    //   ? process.env.DEV_ENV
    //   : process.env.NODE_ENV;

    this.port = parseInt(EnviromentVariableHandler.getVariableByEnvironment('SERVER_PORT', process.env.NODE_ENV), 10) || 3000;
    this.database = database;
  }

  public async run() {
    try {
      await this.database.connect();
      // await this.database.migrateLatest();

      if (process.env.NODE_ENV !== process.env.TEST_ENV) {
        this.server = await this.app.listen(this.port);

        console.log(`App listeting on http://localhost:${this.port}`);
      }
    } catch (e) {
      console.error(e);
      throw new Error(apiErrors.APP.RUN.message);
    }
  }

  public async stop() {
    if (!this.server) {
      throw new Error('TODO');
    }
    await this.database.disconnect();
    await this.server.close();

  }
}
