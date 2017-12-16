// https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/

const db = require('./db/database.model');
const { _, moment } = require('../shared/common.api');

class ObjectModel {
    constructor(idObject = 0) {
        this.id = 0;
        this.createdAt = null;
        this.updatedAt = null;

        this.constructor.getDbProperties.push('createdAt');
        this.constructor.getDbProperties.push('updatedAt');

        if (idObject > 0) {
            this.id = idObject;
        }
    }

    async _init() {
        const sql = `
            SELECT ${_.join(this.constructor.getDbProperties)}
            FROM ${this.constructor.getTableName}
            WHERE ${this.constructor.getPrimaryKey} = ?
        `;

        try {
            const rows = await db.get().query(sql, this.id);
            if (!_.isEmpty(rows)) {
                _.forOwn(rows[0], (value, key) => {
                    this[key] = value;
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    async save() {
        const sql = `
            INSERT INTO ${this.constructor.getTableName}
            SET ?
        `;

        const insertData = {};

        _.forEach(this.constructor.getDbProperties, (value) => {
            insertData[value] = this[value];
        });

        insertData.createdAt = moment().utc().format('YYYY-MM-DD HH:mm:ss');
        insertData.updatedAt = moment().utc().format('YYYY-MM-DD HH:mm:ss');

        try {
            const result = await db.get().query(sql, insertData);

            this.id = result[0].insertId;
            this[this.constructor.getPrimaryKey] = result[0].insertId;

            this._init();
        } catch (e) {
            console.log(e);
        }
    }

    async update() {
        const sql = `
            UPDATE ${this.constructor.getTableName}
            SET ?
            WHERE ${this.constructor.getPrimaryKey} = ${this.id}
        `;

        const updateData = {};

        _.forEach(this.constructor.getDbProperties, (value) => {
            updateData[value] = this[value];
        });

        delete updateData.createdAt;
        delete updateData[this.constructor.getPrimaryKey];

        updateData.updatedAt = moment().utc().format('YYYY-MM-DD HH:mm:ss');

        try {
            await db.get().query(sql, updateData);

            this._init();
        } catch(e) {
            console.log(e);
        }
    }

    async delete() {
        const sql = `
            DELETE
            FROM ${this.constructor.getTableName}
            WHERE ${this.constructor.getPrimaryKey} = ${this.id}
        `;

        try {
            await db.get().query(sql);
        } catch (e) {
            console.log(e);
        }
    }

    async getAll() {
        const objects = [];

        const sql = `
            SELECT ${_.join(this.constructor.getDbProperties)}
            FROM ${this.constructor.getTableName}
            ORDER BY ${this.constructor.getPrimaryKey}
        `;

        try {
            const [rows] = await db.get().query(sql);

            _.forEach(rows, (row) => {
                if (!_.isEmpty(row)) {
                    objects.push(row);
                }
            });
        } catch (e) {
            console.log(e);
        }

        return objects;
    }
}

module.exports = ObjectModel;
