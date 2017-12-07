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

    constructor(idCategory = 0, autoInit = false) {
        super(idCategory);
        this.idCategory = this.id;
        this.name = "";
        this.idCategoryParent = 0;

        if(autoInit === true) {
            this.init();
        }
    }

    get dbEntity() {
        return _dbEntity;
    }

    get dbObjectProperties() {
        return _dbObjectProperties;
    }

    async getAll() {
        const category = new Category();
        return await super.getAll(category);
    }
}


const c = new Category(2);
c.getAll();

module.exports = Category;


