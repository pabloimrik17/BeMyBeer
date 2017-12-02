'use strict';

const db = require('../../db/dbObject');
const _ = require('lodash');

let _childObject = Symbol();
let _dbObjectProperties = Symbol();

class ObjectModel {

    constructor(idObject = 0, dbObjectProperties = []) {
        this[_childObject] = this.constructor.name.toLowerCase();
        this[_dbObjectProperties] = dbObjectProperties;
        this.dateInsert = null;
        this.dateUpdate = null;

        if(idObject > 0) {
            this.init(idObject);
        }
    }

    init(idObject) {
        const sql = "" +
            " SELECT " + _.join(this[_dbObjectProperties]) +
            " FROM " + this[_childObject] +
            " WHERE id_"+ this[_childObject] + " = " + idObject +
        "";

        db.get().query(sql, (err, rows) => {
            if (err) {
                throw Error('Init failure');
            }

            if(!_.isEmpty(row)) {
                _.forOwn(row[0], (value, key) => {
                    this[key] = value;
                });
            }
        });
    }
}