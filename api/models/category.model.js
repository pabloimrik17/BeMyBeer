'use strict';

const bd = require('../../db/dbObject');
const ObjectModel = require("./object.model");

// DB DEFINITIONS

const _dbEntity = "category";

const _dbObjectProperties = [
    "id_category as idCategory",
    "name as name",
    "id_category_parent as idCategoryParent",
    "date_insert as dateInsert",
    "date_update as dateUpdate"
];

class Category extends ObjectModel {

    constructor(idCategory = 0, autoInit = true) {
        super(idCategory);
        this.idCategory = 0;
        this.name = "";
        this.idCategoryParent = 0;

        if(idCategory > 0 && autoInit === true) {
            this.idCategory = idCategory;

            this._init();
        }
    }

    static get dbEntity() {
        return _dbEntity;
    }

    static get dbObjectProperties() {
        return _dbObjectProperties;
    }
}

module.exports = Category;


