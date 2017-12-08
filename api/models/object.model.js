'use strict';

const db = require('../../db/dbObject');
const _ = require('lodash');

class ObjectModel {

    constructor(idObject = 0, autoInit = true) {
        this.id = 0;
        this.dateInsert = null;
        this.dateUpdate = null;

        if(idObject > 0) {
            this.id = idObject
        }
    }

    // TODO PENDING OF ABSTRACTION TO AVOID PARAMETERS ON FUNCTION
    async _init(dbEntity, dbObjectProperties) {
        dbObjectProperties.push("date_insert as dateInsert");
        dbObjectProperties.push("date_update as dateUpdate");

        const sql = "" +
            " SELECT " + _.join(dbObjectProperties) +
            " FROM " + dbEntity +
            " WHERE id_" + dbEntity + " = " + this.id +
            "";

        try {
            const [rows, fields] = await db.get().query(sql);

            if (!_.isEmpty(rows)) {
                _.forOwn(rows[0], (value, key) => {
                    this[key] = value;
                });
            }

        } catch (e) {
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
            const [rows, fields] = await db.get().query(sql);

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

    async delete(dbEntity) {
        const sql = "" +
            " DELETE " +
            " FROM " + dbEntity +
            " WHERE id_" + dbEntity + " = " + this.id +
            "";

        try {
            await db.get().query(sql);
        } catch(e) {
            console.log(e);
        }

    }
}

module.exports = ObjectModel;