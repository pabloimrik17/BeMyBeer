import * as importedMoment from 'moment';
import 'reflect-metadata';
import DateModel from '../../../api/classes/DateModel';
import { container } from '../../../api/ioc/ioc';
import { classTypes } from '../../../api/ioc/types';

describe('Date Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    test('Expect all kind of good stuff', () => {
      const dateModel: DateModel = container.get<DateModel>(classTypes.DateModel);
      expect(dateModel).toBeTruthy();
    });
  });

  describe('getCurrentDate', () => {
    const dateToCheck: string = '17/01/1992 07:00:00';

    test(`Expect getCurrentDate function to return ${dateToCheck}`, () => {
      // moment.now = () => +new Date(1992, 1, 17, 7, 0, 0);
      const mockUtc = jest.spyOn(importedMoment, 'utc');
      const mockFormat = jest.spyOn(importedMoment.fn, 'format').mockImplementation((format: string) => dateToCheck);

      const dateModel: DateModel = new DateModel(importedMoment);
      const currentDate: string = dateModel.getCurrentDate();

      expect(mockUtc).toBeCalledTimes(1);
      expect(mockFormat).toBeCalledTimes(1);
      expect(mockFormat).toBeCalledWith(DateModel.DATE_TIME_FORMAT);
      expect(currentDate).toBe(dateToCheck);
    });
  });
});
