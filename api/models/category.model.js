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
        super(idCategory);
        this.idCategory = 0;
        this.name = '';
        this.idParent = 0;

        if (idCategory > 0) {
            this.idCategory = idCategory;
        }
    }

    static get getPrimaryKey() {
        return _definition.primaryKey;
    }

    static get getTableName() {
        return _definition.tableName;
    }

    static get getDbProperties() {
        return _definition.dbProperties;
    }

    /**
     * @deprecated
     * @param idCategory
     * @returns {Promise<Category>}
     */
    static async getOne(idCategory) {
        const category = new Category(idCategory);
        await category.get();

        return category;
    }

    /**
     * @deprecated
     * @param idCategory
     * @returns {Promise<void>}
     */
    static async deleteOne(idCategory) {
        await super.deleteOne(idCategory, Category.getTableName);
    }
}

module.exports = Category;
