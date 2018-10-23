import 'reflect-metadata';
import ObjectModel from '../../../api/classes/ObjectModel.class';
import * as lodash from 'lodash';
import { database } from '../../../api/shared/Database';

let objectModel: ObjectModel

describe('Object Model', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    objectModel = new ObjectModel(0, database, lodash)
  })

  test('For Each Should Be Called Two Times', () => {
    objectModel.prueba()
    expect(lodash.forEach).toHaveBeenCalledTimes(2)
  })

  test('hola', () => {
    expect(database.mode).toBe('HOLA')
  })
})