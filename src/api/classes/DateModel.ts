import { inject, injectable } from 'inversify';
import { Moment } from 'moment';
import 'reflect-metadata';
import { Moment as MomentIoc } from '../ioc/interfaces';
import { npmTypes } from '../ioc/types';

@injectable()
export default class DateModel {
  public static readonly DATE_FORMAT: string = 'YYYY-MM-DD';
  public static readonly DATE_TIME_FORMAT: string = 'YYYY-MM-DD HH:mm:ss';

  private moment: MomentIoc;

  constructor(@inject(npmTypes.Moment)moment: MomentIoc) {
    this.moment = moment;
  }

  public getCurrentDateTime(): string {
    return this.getCurrentWithFormat(DateModel.DATE_TIME_FORMAT);
  }

  public getCurrentDate(): string {
    return this.getCurrentWithFormat(DateModel.DATE_FORMAT);
  }

  private getCurrent(): Moment {
    return this.moment.utc();
  }

  private getCurrentWithFormat(format: string) {
    return this.getCurrent().format(format);
  }
}
