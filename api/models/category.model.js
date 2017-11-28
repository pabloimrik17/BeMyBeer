'use strict';

const bd = require('../shared/bdObject');
const ObjectModel = require("./object.model");

class Category extends ObjectModel {

    constructor(idCategory = 0) {
        super();
        this._idCategory = idCategory;
        this._name = "";
        this._idCategoryParent = 0;

        if(this._idCategory > 0) {
            this.init();
        }
    }

    set idCategory(value) {
        this._idCategory = value;
    }

    get idCategory() {
        return this._idCategory;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get idCategoryParent() {
        return this._idCategoryParent;
    }

    set idCategoryParent(value) {
        this._idCategoryParent = value;
    }

    private init() {
        // TODO RECOVER DATA FROM BD AND APPLY TO OBJECT
    }

    static getAllCategories() {
        // TODO RECOVER ALL id_categoy, instante objects and gather all into a array
    }

    public insertCategory() {
        // TODO SAVE OBJECT
    }

    public updateCategory() {
        // TODO SAVE OBJECT
    }

    public deleteCategory() {
        //TODO DELETE OBJECT
    }
}

module.exports = Category;
