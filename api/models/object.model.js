'use strict';

const db = require('../../db/dbObject');
const _ = require('lodash');

let _childObjectName = Symbol();
let _dbObjectProperties = Symbol();

class ObjectModel {

    constructor(idObject = 0, dbObjectProperties = []) {
        this[_childObjectName] = this.constructor.name.toLowerCase();
        this[_dbObjectProperties] = dbObjectProperties;

        this.id = idObject;
        this.dateInsert = null;
        this.dateUpdate = null;
    }

    async init() {
        const sql = "" +
            " SELECT " + _.join(this[_dbObjectProperties]) +
            " FROM " + this[_childObjectName] +
            " WHERE id_" + this[_childObjectName] + " = " + this.id +
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
        let objects = [];

        const sql = "" +
            " SELECT " + _.join(this[_dbObjectProperties]) +
            " FROM " + this[_childObjectName] +
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