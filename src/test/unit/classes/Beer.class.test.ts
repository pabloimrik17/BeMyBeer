import 'reflect-metadata'
import Beer from '../../../api/classes/Beer.class'

jest.mock('../../../api/classes/Beer.class')
let beer: Beer

describe('Beer Class Unit', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    beer = new Beer()
  })

  describe('Constructor', () => {
    test('Expect Beer Constructor to be called', () => {
      expect(Beer).toBeCalledTimes(1)
    })

    test('Expect Beer object to exist', () => {
      expect(beer).toBeTruthy()
    })
  })
})