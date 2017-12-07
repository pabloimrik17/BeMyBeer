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

    async _init() {
        const sql = "" +
            " SELECT " + _.join(this.dbObjectProperties) +
            " FROM " + this.dbEntity +
            " WHERE id_" + this.dbEntity + " = " + this.id +
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
}

module.exports = ObjectModel;