import {Container, ContainerModule} from 'inversify'
import lodash from 'lodash'
import {TYPES} from './types'
import {Lodash} from './interfaces'

const thirdPartyDependencies: ContainerModule = new ContainerModule((bind) => {
  bind<Lodash>(TYPES.Lodash).toConstantValue(lodash)
})

const container: Container = new Container()

container.load(thirdPartyDependencies)

export {container}