import {Container, ContainerModule} from 'inversify'
import * as lodash from 'lodash'
import {APPLICACION_TYPES, THIRD_PARTY_TYPES} from './THIRD_PARTY_TYPES'
import {Lodash, Moment} from './interfaces'
import ObjectModel from '../classes/ObjectModel.class'
import Database from '../shared/Database'
import * as moment from 'moment'

const thirdPartyDependencies: ContainerModule = new ContainerModule((bind) => {
  bind<Lodash>(THIRD_PARTY_TYPES.Lodash).toConstantValue(lodash)
  bind<Moment>(THIRD_PARTY_TYPES.Moment).toConstantValue(moment)
})

const applicationDependencies: ContainerModule = new ContainerModule((bind) => {
  bind<ObjectModel>(APPLICACION_TYPES.ObjectModel).to(ObjectModel)
  bind<Database>(APPLICACION_TYPES.Database).to(Database)
})

const container: Container = new Container()

container.load(thirdPartyDependencies)

export {container}