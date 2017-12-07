'use strict';

const db = require('../../db/dbObject');
const _ = require('lodash');

class ObjectModel {

    constructor(idObject = 0) {
        this.id = idObject;
        this.dateInsert = null;
        this.dateUpdate = null;
    }

    async init() {
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


    async getOne() {
        try {
            await this.init();
        } catch (e) {
            console.log(e);
        }
    }

    async getAll(childObject) {
        let object = new this.constructor.name();
        let objects = [];

        const sql = "" +
            " SELECT " + _.join(this.dbObjectProperties) +
            " FROM " + this.dbEntity +
            "";

        try {
            const [rows, fields] = await db.get().query(sql);

            _.forEach(rows, (row) => {
                if (!_.isEmpty(rows)) {
                    _.forOwn(row, (value, key) => {
                        childObject[key] = value;
                    });

                    objects.push(childObject);
                }
            });
            return objects;
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = ObjectModel;