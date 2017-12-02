'use strict';

const bd = require('../../db/dbObject');
const ObjectModel = require("./object.model");

const dbObjectProperties = [
    "id_category as idCategory",
    "name as name",
    "id_category_parent as idCategoryParent",
    "date_insert as dateInsert",
    "date_update as dateUpdate"
];

class Category extends ObjectModel {

    constructor(idCategory = 0) {
        super(idCategory, dbObjectProperties);
        this.idCategory = this.id;
        this.name = "";
        this.idCategoryParent = 0;
    }

    async getAll() {
        const category = new Category();
        return await super.getAll(category);
    }
}

module.exports = Category;
