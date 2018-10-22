import ObjectModel from './ObjectModel.class'
import {inject, injectable} from 'inversify'
import {APPLICACION_TYPES, THIRD_PARTY_TYPES} from '../ioc/THIRD_PARTY_TYPES'
import Database, {database as importedDatabase} from '../shared/Database'
import {Lodash} from '../ioc/interfaces'
import * as npmLodash from 'lodash'

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


  constructor() {
    this.idBeer = 0
    this.name = ''
    this.graduation = 0
    this.color = ''
    this.score = 0
    this.price = 0
    this.idCategory = 0
    this.datePurchased = ''
    this.dateDrinked = ''
  }
}

@injectable()
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


  constructor(idBeer = 0,
              @inject(APPLICACION_TYPES.Database) database: Database = importedDatabase,
              @inject(THIRD_PARTY_TYPES.Lodash) lodash: Lodash = npmLodash) {
    super(idBeer, database, lodash)
    this.idBeer = 0
    this.name = ''
    this.graduation = 0
    this.color = ''
    this.score = 0
    this.price = 0
    this.idCategory = 0
    this.datePurchased = ''
    this.dateDrinked = ''

    if (idBeer > 0) {
      this.idBeer = idBeer
    }
  }
}
