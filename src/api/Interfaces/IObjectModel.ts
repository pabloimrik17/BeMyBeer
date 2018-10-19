export default interface IObjectModel {
  getAllDb<T>(): Promise<Array<T>>

  getDb<T>(): Promise<T>

  save<T>(data: T): Promise<T>

  update<T>(data: T): Promise<T>

  delete(): Promise<void>
}