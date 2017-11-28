'use strict';

const bd = require('../shared/bdObject');

class Category {
    constructor(idCategory = 0) {
        this._idCategory = idCategory;
    }

    set idCategory(value) {
        this._idCategory = value;
    }

    get idCategory() {
        return this._idCategory;
    }
}

module.exports = Category;