import * as moment from 'moment'

export default class DateModel {
  public static getCurrentDate (): string {
    return moment.utc().format('YYYY-MM-DD HH:mm:ss');
  }
}