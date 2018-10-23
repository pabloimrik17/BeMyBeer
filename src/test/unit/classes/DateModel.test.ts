import 'reflect-metadata';
import DateModel from '../../../api/classes/DateModel';

let moment: any = undefined;
const dateToCheck: string = '17/01/1992 07:00:00';

describe('Date Model', () => {
  beforeEach(() => {
      jest.clearAllMocks();
      moment = require.requireActual('moment');
      moment.utc = jest.fn().mockReturnThis();
      moment.format = jest.fn();
  });

  describe('getCurrentDate', () => {
    test('Expect utc function to be called one time', () => {
        DateModel.getCurrentDate(moment);

        expect(moment.utc).toBeCalledTimes(1);
    });

    test('Expect format function to be called one time', () => {
        DateModel.getCurrentDate(moment);

        expect(moment.format).toBeCalledTimes(1);
    });

      test('Expect format function to be called with ' + DateModel.DATE_FORMAT + ' as parameter', () => {
          DateModel.getCurrentDate(moment);

          expect(moment.format).toBeCalledWith(DateModel.DATE_FORMAT);
      });

      test('Expect format function to return ' + dateToCheck, () => {
          moment.format = jest.fn((formatString: number) => dateToCheck);

          const currentDate: string = DateModel.getCurrentDate(moment);

          expect(currentDate).toBe(dateToCheck);
      });
  });
});
