import { Container, ContainerModule } from 'inversify';
import * as lodash from 'lodash';
import * as moment from 'moment';
import * as mysql2 from 'mysql2/promise';
import App from '../../App';
import Beer from '../classes/Beer';
import BeerDb from '../classes/BeerDb';
import Category from '../classes/Category';
import CategoryDb from '../classes/CategoryDb';
import DateModel from '../classes/DateModel';
import ObjectModel from '../classes/ObjectModel';
import BeerRoutesController from '../controllers/BeerRoutesController';
import CategoryRoutesController from '../controllers/CategoryRoutesController';
import ApiResponser from '../shared/apiResponser/ApiResponser';
import Database from '../shared/Database';
import { Lodash, Moment, Mysql2 } from './interfaces';
import { classTypes, npmTypes } from './types';

const npmDependencies: ContainerModule = new ContainerModule((bind) => {
  bind<Lodash>(npmTypes.Lodash).toConstantValue(lodash);
  bind<Moment>(npmTypes.Moment).toConstantValue(moment);
  bind<Mysql2>(npmTypes.Mysql2).toConstantValue(mysql2);
});

const classDependencies: ContainerModule = new ContainerModule((bind) => {
  bind<App>(classTypes.App).to(App).inSingletonScope();
  bind<ObjectModel>(classTypes.ObjectModel).to(ObjectModel);
  bind<Database>(classTypes.Database).to(Database).inSingletonScope();
  bind<DateModel>(classTypes.DateModel).to(DateModel);
  bind<CategoryDb>(classTypes.CategoryDb).to(CategoryDb);
  bind<BeerDb>(classTypes.BeerDb).to(BeerDb);
  bind<Category>(classTypes.Category).to(Category);
  bind<Beer>(classTypes.Beer).to(Beer);
  bind<BeerRoutesController>(classTypes.BeerRoutesController).to(BeerRoutesController);
  bind<CategoryRoutesController>(classTypes.CategoryRoutesController).to(CategoryRoutesController);
  bind<ApiResponser>(classTypes.ApiResponser).to(ApiResponser);
});

const container: Container = new Container();

container.load(npmDependencies);
container.load(classDependencies);

export { container };
