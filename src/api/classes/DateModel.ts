import * as importedMoment from 'moment'
import {Moment} from '../ioc/interfaces'

export default class DateModel {
  constructor() {
  }

  public static getCurrentDate(moment: Moment = importedMoment): string {
    return moment.utc().format('YYYY-MM-DD HH:mm:ss');
  }
}