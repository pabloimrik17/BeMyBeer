import * as moment from 'moment'
import {database} from '../shared/Database'
import {isEmpty} from 'lodash'
import apiErrors from '../shared/apiResponser/ApiErrors'
import {FieldPacket, QueryError, RowDataPacket} from 'mysql2'

export default class ObjectModel {
  private id: number
  private createdAt: string
  private updatedAt: string
  private dbProperties: Array<string>
  private primaryKey: string
  private tableName: string

  constructor (id: number, primaryKey: string, tableName: string, dbProperties: Array<string>) {
    this.primaryKey = primaryKey
    this.tableName = tableName
    this.dbProperties = dbProperties
    this.id = 0
    this.createdAt = null
    this.updatedAt = null

    if (id > 0) {
      this.id = id
    }
  }

  private getCurrentDate (): string {
    return moment.utc().format('YYYY-MM-DD HH:mm:ss')
  }

  public async getAll (): Promise<Array<any>> {
    const objects: Array<any> = []

    const sql: string = `
      SELECT ${this.dbProperties.join(', ')}
      FROM ${this.tableName}
      ORBER BY ${this.primaryKey}   
    `

    try {
      // TODO DI
      const [error, rows]: [any, FieldPacket[]] = await database.Pool.query(sql)
      debugger

      /*rows.forEach((row: RowDataPacket) => {
        // TODO DI
        if (!isEmpty(row)) {
          objects.push(row)
        }
      })*/
    } catch (error) {
      console.error(error)
      // TODO DI
      throw apiErrors.OBJECT_MODEL_GET_ALL
    }

    return objects
  }


}