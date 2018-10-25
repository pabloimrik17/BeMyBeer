import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export default class BeerDb {
  public idBeer: number;
  public name: string;
  public graduation: number;
  public color: string;
  public score: number;
  public price: number;
  public idCategory: number;
  public datePurchased: string;
  public dateDrinked: string;

  constructor() {
    this.idBeer = 0;
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