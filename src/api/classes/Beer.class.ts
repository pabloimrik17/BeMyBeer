import BeerDb from './BeerDb';
import ObjectModel from './ObjectModel.class';

export default class Beer extends ObjectModel {
  public idBeer: number;
  public name: string;
  public graduation: number;
  public color: string;
  public score: number;
  public price: number;
  public idCategory: number;
  public datePurchased: string;
  public dateDrinked: string;
  protected dbProperties: Array<string> = Object.keys(new BeerDb());
  protected primaryKey: string = 'idBeer';
  protected tableName: string = 'beer';

  constructor() {
    super();
    this.Id = 0;
    this.name = '';
    this.graduation = 0;
    this.color = '';
    this.score = 0;
    this.price = 0;
    this.idCategory = 0;
    this.datePurchased = '';
    this.dateDrinked = '';
  }
}
