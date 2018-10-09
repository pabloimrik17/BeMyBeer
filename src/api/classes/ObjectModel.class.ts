import apiErrors from '../shared/apiResponser/ApiErrors';
import { database } from '../shared/Database';
import { isEmpty } from 'lodash';
import { FieldPacket } from 'mysql2';
import { CategoryDb } from './Category.class';
import * as moment from 'moment';


export default abstract class ObjectModel {
    protected abstract readonly dbProperties: Array<string>;
    protected abstract readonly primaryKey: string;
    protected abstract readonly tableName: string;
    private id: number;
    private createdAt: string;
    private updatedAt: string;

    protected constructor(id: number) {
        this.id = 0;
        this.createdAt = null;
        this.updatedAt = null;

        if (id > 0) {
            this.id = id;
        }
    }

    public async getAll(): Promise<Array<any>> {
        const objects: Array<any> = [];

        const sql: string = `
          SELECT ${this.dbProperties.join(', ')}
          FROM ${this.tableName}
          ORBER BY ${this.primaryKey}   
        `;

        try {
            // TODO DI
            const [error, rows]: [any, FieldPacket[]] = await database.Pool.query(sql);
            rows.forEach((row: FieldPacket) => {
                // TODO DI
                if (!isEmpty(row)) {
                    objects.push(row);
                }
            });
        } catch (error) {
            console.error(error);
            // TODO DI
            throw apiErrors.OBJECT_MODEL_GET_ALL;
        }

        return objects;
    }

    protected abstract init(data: any): void;

    private getCurrentDate(): string {
        return moment.utc().format('YYYY-MM-DD HH:mm:ss');
    }
}

