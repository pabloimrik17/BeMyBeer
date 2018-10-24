import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { THIRD_PARTY_TYPES } from '../ioc/THIRD_PARTY_TYPES';
import { Moment } from 'moment';

@injectable()
export default class DateModel {
    public static readonly DATE_FORMAT: string = 'YYYY-MM-DD HH:mm:ss';

    private _moment: Moment;

    constructor(@inject(THIRD_PARTY_TYPES.Moment)moment: Moment) {
        this._moment = moment;
    }

    public getCurrentDate(): string {
        return this._moment.utc().format(DateModel.DATE_FORMAT);
    }
}