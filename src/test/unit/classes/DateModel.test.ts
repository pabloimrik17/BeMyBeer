import 'reflect-metadata'
import DateModel from '../../../api/classes/DateModel'

let moment: any = undefined
describe('Date Model', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    moment = require.requireActual('moment')
    moment.utc = jest.fn().mockReturnThis()
    moment.format = jest.fn()
  })

  describe('getCurrentDate', () => {
    test('Expect utc function to be called one time', () => {
      DateModel.getCurrentDate(moment)

      expect(moment.utc).toBeCalledTimes(1)
    })

    test('Expect format function to be called one time', () => {
      DateModel.getCurrentDate(moment)

      expect(moment.format).toBeCalledTimes(1)
    })

    test('Expect format function to be called with "YYYY-MM-DD HH:mm:ss" as parameter', () => {
      DateModel.getCurrentDate(moment)

      expect(moment.format).toBeCalledWith('YYYY-MM-DD HH:mm:ss')
    })

    test('Expect format function to return "17/01/1992 07:00:00"', () => {
      moment.format = jest.fn((formatString: number) => '17/01/1992 07:00:00')

      const currentDate: string = DateModel.getCurrentDate(moment)

      expect(currentDate).toBe('17/01/1992 07:00:00')
    })
  })
})
