'use strict';

const bd = require('../../db/dbObject');
const ObjectModel = require("./object.model");

// DB DEFINITIONS
const _definition = {
    tableName: "category",
    dbFields: [
        "id_category as idCategory",
        "name as name",
        "id_category_parent as idCategoryParent"
    ],
};

class Category extends ObjectModel {

    constructor(idCategory = 0, autoInit = true) {
        super(idCategory);
        this.idCategory = 0;
        this.name = "";
        this.idCategoryParent = 0;

        if(idCategory > 0 && autoInit === true) {
            this.idCategory = idCategory;
        }
    }

    async _init() {
        await super._init(Category.tableName, Category.dbFields);
    }

    static async getOne(idCategory) {
        const category = new Category(idCategory);
        await category._init();

        return category;
    }

    static async deleteOne(idCategory) {
        await super.deleteOne(idCategory, Category.tableName);
    }

}

const cat = new Category(1);
cat._init();

module.exports = Category;


