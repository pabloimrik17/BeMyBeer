import { OptionsUrlencoded } from 'body-parser';
import { Express } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { BodyParser } from './api/ioc/interfaces';
import { classTypes, npmTypes } from './api/ioc/types';
import routes from './api/routes/routes';
import { apiErrors } from './api/shared/apiResponser/ApiErrors';
import Database from './api/shared/Database';

require('dotenv').config();

@injectable()
export default class App {
  public static readonly urlEncodedConfig: OptionsUrlencoded = { extended: false };

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
    // app.use(logger('dev'));

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
      throw new Error(apiErrors.APP.RUN.message);
    }
  }
}
