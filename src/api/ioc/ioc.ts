import { Container, ContainerModule } from 'inversify';
import * as lodash from 'lodash';
import * as moment from 'moment';
import * as mysql2 from 'mysql2/promise';
import App from '../../App';
import BeerDb from '../classes/BeerDb';
import Beer from '../classes/Beer';
import Category from '../classes/Category';
import CategoryDb from '../classes/CategoryDb';
import DateModel from '../classes/DateModel';
import ObjectModel from '../classes/ObjectModel';
import Database from '../shared/Database';
import { Lodash, Moment, Mysql2 } from './interfaces';
import { ClassTypes, NpmTypes } from './types';

const npmDependencies: ContainerModule = new ContainerModule((bind) => {
  bind<Lodash>(NpmTypes.Lodash).toConstantValue(lodash);
  bind<Moment>(NpmTypes.Moment).toConstantValue(moment);
  bind<Mysql2>(NpmTypes.Mysql2).toConstantValue(mysql2);
});

const classDependencies: ContainerModule = new ContainerModule((bind) => {
  bind<App>(ClassTypes.App).to(App).inSingletonScope();
  bind<ObjectModel>(ClassTypes.ObjectModel).to(ObjectModel);
  bind<Database>(ClassTypes.Database).to(Database).inSingletonScope();
  bind<DateModel>(ClassTypes.DateModel).to(DateModel);
  bind<CategoryDb>(ClassTypes.CategoryDb).to(CategoryDb);
  bind<BeerDb>(ClassTypes.BeerDb).to(BeerDb);
  bind<Category>(ClassTypes.Category).to(Category);
  bind<Beer>(ClassTypes.Beer).to(Beer);
});

const container: Container = new Container();

container.load(npmDependencies);
container.load(classDependencies);

export { container };
