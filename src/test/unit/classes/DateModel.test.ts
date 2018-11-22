import moment from 'moment';
import 'reflect-metadata';
import DateModel from '../../../api/classes/DateModel';
import { Moment } from '../../../api/ioc/interfaces';
import { container } from '../../../api/ioc/ioc';
import { classTypes, npmTypes } from '../../../api/ioc/types';

const originalEnv = { ...process.env };

describe('Date Model', () => {
  beforeEach(() => {
    container.snapshot();
    jest.clearAllMocks();
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    container.restore();
  });

  describe('Constructor', () => {
    test('Expect all kind of good stuff', () => {
      const dateModel: DateModel = container.get<DateModel>(classTypes.DateModel);
      expect(dateModel).toBeTruthy();
    });
  });

  describe('getCurrentDateTime', () => {
    test('Expect to return current date in datetime format', () => {
      container.unbind(npmTypes.Moment);
      const utcTime: string = '1992-01-17 06:00:00';
      const utcMock = jest.fn(() => moment(utcTime));
      const momentMock: Partial<Moment> = {
        utc: utcMock,
      };
      container.bind<Partial<Moment>>(npmTypes.Moment).toConstantValue(momentMock);

      const dateModel: DateModel = container.get<DateModel>(classTypes.DateModel);
      const currentDate: string = dateModel.getCurrentDateTime();

      expect(utcMock).toBeCalledTimes(1);
      expect(currentDate).toBe(utcTime);
    });
  });
  describe('getCurrentDate', () => {
    test('Expect to return current date in date format', () => {
      container.unbind(npmTypes.Moment);
      const utcTime: string = '1992-01-17 06:00:00';
      const dateFormatedTime: string = '1992-01-17';
      const utcMock = jest.fn(() => moment(utcTime));
      const momentMock: Partial<Moment> = {
        utc: utcMock,
      };
      container.bind<Partial<Moment>>(npmTypes.Moment).toConstantValue(momentMock);

      const dateModel: DateModel = container.get<DateModel>(classTypes.DateModel);
      const currentDate: string = dateModel.getCurrentDate();

      expect(utcMock).toBeCalledTimes(1);
      expect(currentDate).toBe(dateFormatedTime);
    });
  });
});
