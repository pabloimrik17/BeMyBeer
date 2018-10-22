import * as importedMoment from 'moment';
import { Moment } from '../ioc/interfaces';

export default class DateModel {
    public static readonly DATE_FORMAT: string = 'YYYY-MM-DD HH:mm:ss';

    constructor() {
    }

    public static getCurrentDate(moment: Moment = importedMoment): string {
        return moment.utc().format(DateModel.DATE_FORMAT);
    }
}