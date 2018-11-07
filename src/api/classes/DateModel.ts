import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Moment } from '../ioc/interfaces';
import { npmTypes } from '../ioc/types';

@injectable()
export default class DateModel {
  public static readonly DATE_FORMAT: string = 'YYYY-MM-DD';
  public static readonly DATE_TIME_FORMAT: string = 'YYYY-MM-DD HH:mm:ss';

  private moment: Moment;

  constructor(@inject(npmTypes.Moment)moment: Moment) {
    this.moment = moment;
  }

  public getCurrentDate(): string {
    const currentDate = this.moment.utc();

    return currentDate.format(DateModel.DATE_TIME_FORMAT);
  }
}
