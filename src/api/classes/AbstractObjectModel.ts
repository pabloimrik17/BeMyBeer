export default abstract class AbstractObjectModel {
  protected abstract dbProperties: Array<string>
  protected abstract primaryKey: string
  protected abstract tableName: string


  protected constructor() {
  }
}