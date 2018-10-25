import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Moment } from '../ioc/interfaces';
import { NpmTypes } from '../ioc/types';

@injectable()
export default class DateModel {
  public static readonly DATE_FORMAT: string = 'YYYY-MM-DD HH:mm:ss';

    private _moment: Moment;

  constructor(@inject(NpmTypes.Moment)moment: Moment) {
        this._moment = moment;
    }

  public getCurrentDate(): string {
    const currentDate = this._moment.utc();

    return currentDate.format(DateModel.DATE_FORMAT);
  }
}