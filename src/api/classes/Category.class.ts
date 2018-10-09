import ObjectModel from './ObjectModel.class';

// DB DEFINITIONS

abstract class CategoryDb {
    idCategory: number;
    name: string;
    idParent: number;
    createdAt: string;
    updatedAt: string;
}

class Category extends ObjectModel implements CategoryDb {
    protected readonly primaryKey: string = 'idCategory';
    protected readonly tableName: string = 'category';
    private readonly dbProperties: Array<string> = Object.keys(new Category());


    constructor(idCategory = 0) {
        super(idCategory);
        this.idCategory = 0;
        this.name = '';
        this.idParent = 0;

        if (idCategory > 0) {
            this.idCategory = idCategory;
        }
    }

    async getAll(): Promise<Array<CategoryDb>> {
        return super.getAll();
    }
}

module.exports = Category;
