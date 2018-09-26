// https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/

const db = require('../shared/database');
const lodash = require('lodash');
const moment = require('moment');
const { apiErrors } = require('../shared/common.api');

class ObjectModel {
    constructor(idObject = 0, primaryKey = '', tableName = '', dbProperties = []) {
        this._db = db;
        this._lodash = lodash;
        this._moment = moment;
        this._apiErrors = apiErrors;
        this._primaryKey = primaryKey;
        this._tableName = tableName;
        this._dbProperties = dbProperties;

        this.id = 0;
        this.createdAt = null;
        this.updatedAt = null;

        if (idObject > 0) {
            this.id = idObject;
        }
    }

    _getCurrentDate() {
        return this._moment().utc().format('YYYY-MM-DD HH:mm:ss');
    }

    async getAll() {
        const objects = [];

        const sql = `
            SELECT ${this._dbProperties.join(', ')}
            FROM ${this._tableName}
            ORDER BY ${this._primaryKey}
        `;

        try {
            const [rows] = await this._db.get().query(sql);

            rows.forEach((row) => {
                if (!this._lodash.isEmpty(row)) {
                    objects.push(row);
                }
            });
        } catch (error) {
            console.error(error);
            throw this._apiErrors.OBJECT_MODEL_GET_ALL;
        }

        return objects;
    }

    init(options = {}) {
        Object.keys(options).forEach((key) => {
            this[key] = options[key];
        });
    }

    async _get() {
        const sql = `
            SELECT ${this._lodash.join(this._dbProperties)}
            FROM ${this._tableName}
            WHERE ${this._primaryKey} = ?
        `;

        try {
            const [rows] = await this._db.get().query(sql, [this.id]);
            if (!this._lodash.isEmpty(rows)) {
                this._lodash.forOwn(rows[0], (value, key) => {
                    this[key] = value;
                });
            }
        } catch (e) {
            console.error(e);
            throw this._apiErrors.OBJECT_MODEL_INIT_QUERY_ERROR;
        }
    }

    async getFiltered() {
        await this._get();

        return this._getFilteredObject();
    }

    async _save() {
        const sql = `
            INSERT INTO ${this._tableName}
            SET ?
        `;

        const insertData = {};

        this._dbProperties.forEach((value) => {
            insertData[value] = this[value];
        });

        insertData.createdAt = this._getCurrentDate();
        insertData.updatedAt = insertData.createdAt;

        try {
            const result = await this._db.get().query(sql, insertData);

            this.id = result[0].insertId;
            this[this._primaryKey] = result[0].insertId;

            await this._get();
        } catch (e) {
            console.error(e);
            throw this._apiErrors.OBJECT_MODEL_SAVE_QUERY_ERROR;
        }
    }

    async saveAndRetrieveFiltered() {
        await this._save();

        return this._getFilteredObject();
    }

    async _update(updateData) {
        const sql = `
            UPDATE ${this._tableName}
            SET ?
            WHERE ${this._primaryKey} = ?
        `;

        const _dataToUpdate = Object.assign({}, updateData);

        Object.keys(updateData).forEach((key) => {
            if (!this._dbProperties.includes(key)) {
                delete _dataToUpdate[key];
            }
        });

        _dataToUpdate.updatedAt = this._getCurrentDate();

        try {
            await this._db.get().query(sql, [updateData, this.id]);

            await this._get();
        } catch (e) {
            console.error(e);
            throw this._apiErrors.OBJECT_MODEL_UPDATE_QUERY_ERROR;
        }
    }

    async updateAndRetrieveFiltered(updateData) {
        await this._update(updateData);

        return this._getFilteredObject();
    }

    async delete() {
        const sql = `
            DELETE
            FROM ${this._tableName}
            WHERE ${this._primaryKey} = ?
        `;

        try {
            await this._db.get().query(sql, [this.id]);
        } catch (e) {
            console.error(e);
            throw this._apiErrors.OBJECT_MODEL_DELETE_QUERY_ERROR;
        }

        this.id = 0;
        this[this._primaryKey] = 0;
    }

    _getFilteredObject() {
        const newObject = {};

        this._dbProperties.forEach((dbProperty) => {
            newObject[dbProperty] = this[dbProperty];
        });

        return newObject;
    }
}

module.exports = ObjectModel;
