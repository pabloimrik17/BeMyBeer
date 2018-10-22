import ObjectModel from './ObjectModel.class';
import { inject, injectable } from 'inversify';
import { APPLICACION_TYPES, THIRD_PARTY_TYPES } from '../ioc/THIRD_PARTY_TYPES';
import { Lodash } from '../ioc/interfaces';
import * as npmLodash from 'lodash';
import Database, { database as importedDatabase } from '../shared/Database';

// DB DEFINITIONS

export class CategoryDb {
    public idCategory: number;
    public name: string;
    public idParent: number;

    constructor() {
        this.idCategory = 0;
        this.name = '';
        this.idParent = 0;
    }
}

@injectable()
export default class Category extends ObjectModel {
    public idCategory: number;
    public idParent: number;
    public name: string;
    protected dbProperties: Array<string> = Object.keys(new CategoryDb());
    protected primaryKey: string = 'idCategory';
    protected tableName: string = 'category';

    constructor(idCategory = 0,
                @inject(APPLICACION_TYPES.Database) database: Database = importedDatabase,
                @inject(THIRD_PARTY_TYPES.Lodash) lodash: Lodash = npmLodash) {
        super(idCategory, database, lodash);
        this.idCategory = 0;
        this.name = '';
        this.idParent = 0;

        if (idCategory > 0) {
            this.idCategory = idCategory;
        }
    }
}