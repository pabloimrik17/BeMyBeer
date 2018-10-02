const ObjectModel = require('./object.model');

// DB DEFINITIONS

const _definition = {
    primaryKey: 'idCategory',
    tableName: 'category',
    dbProperties: [
        'idCategory',
        'name',
        'idParent',
        'createdAt',
        'updatedAt',
    ],
};

class Category extends ObjectModel {
    constructor(idCategory = 0) {
        super(idCategory, _definition.primaryKey, _definition.tableName, _definition.dbProperties);
        this.idCategory = 0;
        this.name = '';
        this.idParent = 0;

        if (idCategory > 0) {
            this.idCategory = idCategory;
        }
    }
}

module.exports = Category;
