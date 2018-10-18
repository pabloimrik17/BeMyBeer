import ObjectModel from './ObjectModel.class'

export class BeerDb {
  public idBeer: number
  public name: string
  public graduation: number
  public color: string
  public score: number
  public price: number
  public idCategory: number
  public datePurchased: string
  public dateDrinked: string
}

export default class Beer extends ObjectModel {
  protected dbProperties: Array<string> = Object.keys(new BeerDb())
  protected primaryKey: string = 'idBeer'
  protected tableName: string = 'beer'

  public idBeer: number
  public name: string
  public graduation: number
  public color: string
  public score: number
  public price: number
  public idCategory: number
  public datePurchased: string
  public dateDrinked: string


  constructor (id: number = 0) {
    super(id)
    this.idBeer = 0
    this.name = ''
    this.graduation = 0
    this.color = ''
    this.score = 0
    this.price = 0
    this.idCategory = 0
    this.datePurchased = ''
    this.dateDrinked = ''

    if (id > 0) {
      this.idBeer = id
    }
  }
}
