// https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/

const db = require('../shared/database');
const {_, moment, apiErrors} = require('../shared/common.api');

class ObjectModel {
    constructor (idObject = 0) {
        this.id = 0;
        this.createdAt = null;
        this.updatedAt = null;

        if (idObject > 0) {
            this.id = idObject;
        }
    }

    init (options = {}) {
        Object.keys(options).forEach(key => {
            this[key] = options[key]
        })
    }

    async get () {
        const sql = `
            SELECT ${_.join(this.constructor.getDbProperties)}
            FROM ${this.constructor.getTableName}
            WHERE ${this.constructor.getPrimaryKey} = ?
        `;

        try {
            const [rows] = await db.get().query(sql, [this.id]);
            if (!_.isEmpty(rows)) {
                _.forOwn(rows[0], (value, key) => {
                    this[key] = value;
                });
            }
        } catch (e) {
            console.error(e);
            throw apiErrors.OBJECT_MODEL_INIT_QUERY_ERROR;
        }
    }

    async save () {
        const sql = `
            INSERT INTO ${this.constructor.getTableName}
            SET ?
        `;

        const insertData = {};

        _.forEach(this.constructor.getDbProperties, (value) => {
            insertData[value] = this[value];
        });

        insertData.createdAt = ObjectModel._getCurrentDate();
        insertData.updatedAt = insertData.createdAt;

        try {
            const result = await db.get().query(sql, insertData);

            this.id = result[0].insertId;
            this[this.constructor.getPrimaryKey] = result[0].insertId;

            await this.get();
        } catch (e) {
            console.error(e);
            throw apiErrors.OBJECT_MODEL_SAVE_QUERY_ERROR;
        }
    }

    async update (updateData = {}) {
        const sql = `
            UPDATE ${this.constructor.getTableName}
            SET ?
            WHERE ${this.constructor.getPrimaryKey} = ?
        `;

        Object.keys(updateData).forEach(key => {
            if (!this.constructor.getDbProperties.includes(key)) {
                delete updateData[key]
            }
        });

        updateData.updatedAt = ObjectModel._getCurrentDate();

        try {
            await db.get().query(sql, [updateData, this.id]);

            await this.get();
        } catch (e) {
            console.error(e);
            throw apiErrors.OBJECT_MODEL_UPDATE_QUERY_ERROR;
        }
    }

    async delete () {
        const sql = `
            DELETE
            FROM ${this.constructor.getTableName}
            WHERE ${this.constructor.getPrimaryKey} = ?
        `;

        try {
            await db.get().query(sql, [this.id]);
        } catch (e) {
            console.error(e);
            throw apiErrors.OBJECT_MODEL_DELETE_QUERY_ERROR;
        }

        this.id = 0;
        this[this.constructor.getPrimaryKey] = 0;
    }

    static async getAll () {
        const objects = [];

        const sql = `
            SELECT ${_.join(this.getDbProperties, ', ')}
            FROM ${this.getTableName}
            ORDER BY ${this.getPrimaryKey}
        `;

        try {
            const [rows] = await db.get().query(sql);

            _.forEach(rows, (row) => {
                if (!_.isEmpty(row)) {
                    objects.push(row);
                }
            });
        } catch (error) {
            console.error(error);
            throw apiErrors.OBJECT_MODEL_GET_ALL;
        }

        return objects;
    }

    static _getCurrentDate() {
        return moment().utc().format('YYYY-MM-DD HH:mm:ss');
    }
}

module.exports = ObjectModel;
