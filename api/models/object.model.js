// https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/
'use strict';

const db = require('../db/dbObject');
const {_, moment} = require('../shared/common.api');

class ObjectModel {

    constructor(idObject = 0) {
        this.id = 0;
        this.createdAt = null;
        this.updatedAt = null;

        this["constructor"].getDbProperties.push("createdAt");
        this["constructor"].getDbProperties.push("updatedAt");

        if(idObject > 0) {
            this.id = idObject
        }
    }

    async _init() {

        const sql = `
            SELECT ${_.join(this["constructor"].getDbProperties)}
            FROM ${this["constructor"].getTableName}
            WHERE ${this["constructor"].getPrimaryKey} = ${this.id}
        `;

        try {
            const [rows] = await db.get().query(sql);

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
            INSERT INTO ${this["constructor"].getTableName}
            SET ?
        `;

        let insertData = {};

        _.forEach(this["constructor"].getDbProperties, (value) => {
            insertData[value] = this[value];
        });

        insertData["createdAt"] = moment().utc().format('YYYY-MM-DD HH:mm:ss');
        insertData["updatedAt"] = moment().utc().format('YYYY-MM-DD HH:mm:ss');

        try {
            const result = await db.get().query(sql, insertData);

            this.id = result[0].insertId;
            this[this["constructor"].getPrimaryKey] = result[0].insertId;

            this._init();

        } catch (e) {
            console.log(e);
        }
    }

    async update() {
        const sql = `
            UPDATE ${this["constructor"].getTableName}
            SET ?
            WHERE ${this["constructor"].getPrimaryKey} = ${this.id}
        `;

        let updateData = {};

        _.forEach(this["constructor"].getDbProperties, (value) => {
            updateData[value] = this[value];
        });

        delete updateData["createdAt"];
        delete updateData[this["constructor"].getPrimaryKey];

        updateData["updatedAt"] = moment().utc().format('YYYY-MM-DD HH:mm:ss');

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
            FROM ${this["constructor"].getTableName}
            WHERE ${this["constructor"].getPrimaryKey} = ${this.id}
        `;

        try {
            await db.get().query(sql);
        } catch(e) {
            console.log(e);
        }
    }

    static async getAll() {
        let objects = [];

        const sql = "" +
            " SELECT " + _.join(this.dbObjectProperties) +
            " FROM " + this.dbEntity +
            "";

        try {
            const [rows] = await db.get().query(sql);

            _.forEach(rows, (row) => {
                let object = {};
                if (!_.isEmpty(rows)) {
                    _.forOwn(row, (value, key) => {
                        object[key] = value;
                    });

                    objects.push(object);
                }
            });
            return objects;
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * @deprecated
     * @param idObject
     * @param dbEntity
     * @returns {Promise<void>}
     */
    static async deleteOne(idObject, dbEntity) {
        const sql = "" +
            " DELETE " +
            " FROM " + dbEntity +
            " WHERE id_" + dbEntity + " = " + idObject +
            "";

        try {
            await db.get().query(sql);
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = ObjectModel;