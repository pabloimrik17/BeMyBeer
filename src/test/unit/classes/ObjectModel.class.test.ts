import 'reflect-metadata'
import ObjectModel from '../../../api/classes/ObjectModel.class'
import {Lodash} from '../../../api/ioc/interfaces'

test('Object Model', () => {
  const LodashMocked = jest.fn<Lodash>(() => ({
    forEach: jest.fn().mockReturnValue(true)
  }))

  const lodashMocked = new LodashMocked()

  const objectModel: ObjectModel = new ObjectModel(0, lodashMocked)

  objectModel.prueba()

  expect(lodashMocked.forEach).toHaveBeenCalledTimes(3)
})