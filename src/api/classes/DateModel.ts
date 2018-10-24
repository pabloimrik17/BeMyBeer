import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { THIRD_PARTY_TYPES } from '../ioc/THIRD_PARTY_TYPES';
import { Moment } from '../ioc/interfaces';

@injectable()
export default class DateModel {
  public static readonly DATE_FORMAT: string = 'YYYY-MM-DD HH:mm:ss';

    private _moment: Moment;

    constructor(@inject(THIRD_PARTY_TYPES.Moment)moment: Moment) {
        this._moment = moment;
    }

  public getCurrentDate(): string {
    const currentDate = this._moment.utc();

    return currentDate.format(DateModel.DATE_FORMAT);
  }
}