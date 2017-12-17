const { expect, knex } = require('../common.test');

const Category = require('../../api/models/category.model');
const CategorySeeder = require('../seeders/category.seeder');

let category;
let currentRow;

before(async function () {
    try {
        category = new Category();
        expect(category).to.be.a('object');

        expect(Category.getPrimaryKey).to.exist;
        expect(Category.getTableName).to.exist;
        expect(Category.getDbProperties).to.exist;
        expect(Category.getOne).to.exist;
        expect(category._init).to.exist;
        expect(category.save).to.exist;
        expect(category.delete).to.exist;
        expect(category.update).to.exist;
        expect(category.getAll).to.exist;

        expect(CategorySeeder.getTableName).to.exist;
        expect(CategorySeeder.generateCategoryObject).to.exist;
        expect(CategorySeeder.generateCategoryData).to.exist;
        expect(CategorySeeder.upData).to.exist;
        expect(CategorySeeder.downData).to.exist;

        await CategorySeeder.upData();
    } catch (e) {
        expect(e).to.be.empty;
    }
});

after(async function() {
    try {
        await CategorySeeder.downData();
        
    } catch (e) {
        expect(e).to.be.empty;
    }
});

describe('Instantiate Category Object with no id', function() {
    it('idCategory should be 0', function() {
        expect(category.idCategory).to.be.a('number');
        expect(category.idCategory).to.equal(0);
    });

    it('name should be empty', function() {
        expect(category.name).to.be.a('string');
        expect(category.name).to.equal('');
    });

    it('idCategoryParent should be 0', function() {
        expect(category.idParent).to.be.a('number');
        expect(category.idParent).to.equal(0);
    });

    it('dateInsert should be null', function() {
        expect(category.createdAt).to.equal(null);
    });

    it('dateUpdate should be null', function() {
        expect(category.updatedAt).to.equal(null);
    });
});

describe('Instantiate Category Object with id', function() {
    before(async function() {
        try {
            currentRow = await knex(Category.getTableName).limit(1).orderByRaw('rand()');
            category = new Category(currentRow[0].idCategory);
            expect(category).to.be.a('object');

            await category._init();
            
        } catch (e) {
            expect(e).to.be.empty;
        }
    });

    it('idCategory should be equal to', function() {
        expect(category.idCategory).to.be.a('number');
        expect(category.idCategory).to.equal(currentRow[0].idCategory);
    });

    it('name should be equal to', function() {
        expect(category.name).to.be.a('string');
        expect(category.name).to.equal(currentRow[0].name);
    });

    it('idParent should be equal to', function() {
        expect(category.idParent).to.be.a('number');
        expect(category.idParent).to.equal(currentRow[0].idParent);
    });

    it('createdAt should be equal to', function() {
        expect(category.createdAt).to.be.a.dateString();
        expect(category.createdAt).to.equal(currentRow[0].createdAt);
    });

    it('updatedAt should be equal to', function() {
        expect(category.updatedAt).to.be.a.dateString();
        expect(category.updatedAt).to.equal(currentRow[0].updatedAt);
    });
});

describe('Create new category', function() {
    before(async function() {
        try {
            category = new Category();
            CategorySeeder.generateCategoryObject(category);
            await category.save();

            currentRow = await knex(Category.getTableName).orderBy(Category.getPrimaryKey, 'desc').limit(1);

            category = new Category(currentRow[0].idCategory);
            await category._init();
            
        } catch (e) {
            expect(e).to.be.empty;
        }
    });

    it('idCategory should be equal to', function() {
        expect(category.idCategory).to.be.a('number');
        expect(category.idCategory).to.equal(currentRow[0].idCategory);
    });

    it('name should be equal to', function() {
        expect(category.name).to.be.a('string');
        expect(category.name).to.equal(currentRow[0].name);
    });

    it('idParent should be equal to', function() {
        expect(category.idParent).to.be.a('number');
        expect(category.idParent).to.equal(currentRow[0].idParent);
    });

    it('createdAt should be equal to', function() {
        expect(category.createdAt).to.be.a.dateString();
        expect(category.createdAt).to.equal(currentRow[0].createdAt);
    });

    it('updatedAt should be equal to', function() {
        expect(category.updatedAt).to.be.a.dateString();
        expect(category.updatedAt).to.equal(currentRow[0].updatedAt);
    });
});

describe('Update existing category', function() {
    before(async function() {
        try {
            currentRow = await knex(Category.getTableName).limit(1).orderByRaw('rand()');
            category = new Category(currentRow[0].idCategory);
            expect(category).to.be.a('object');

            await category._init();

            CategorySeeder.generateCategoryObject(category);
            await category.update();
            currentRow = await knex(Category.getTableName).where(Category.getPrimaryKey, currentRow[0].idCategory);
            
        } catch (e) {
            expect(e).to.be.empty;
        }
    });

    it('idCategory should be greather than 0', function() {
        expect(category.idCategory).to.be.a('number');
        expect(category.idCategory).to.equal(category.idCategory);
    });

    it('name should not be empty', function() {
        expect(category.name).to.be.a('string');
        expect(category.name).to.equal(category.name);
    });

    it('idParent should greater than 0', function() {
        expect(category.idParent).to.be.a('number');
        expect(category.idParent).to.equal(category.idParent);
    });

    it('createdAt should not be null', function() {
        expect(category.createdAt).to.be.a.dateString();
        expect(category.createdAt).to.equal(category.createdAt);
    });

    it('updateAt should not be null', function() {
        expect(category.updatedAt).to.be.a.dateString();
        expect(category.updatedAt).to.equal(category.updatedAt);
    });
});

describe('Delete existing Category', function() {
    before(async function() {
        try {
            currentRow = await knex(Category.getTableName).limit(1).orderByRaw('rand()');

            category = new Category(currentRow[0].idCategory);
            expect(category).to.be.a('object');
            await category.delete();

            currentRow = await knex(Category.getTableName).where(Category.getPrimaryKey, currentRow[0].idCategory);
            expect(currentRow).to.be.a('array');
            expect(currentRow).to.be.empty;
            expect(currentRow.length).to.equal(0);
            
        } catch (e) {
            expect(e).to.be.empty;
        }
    });

    it('idCategory should be 0', function() {
        expect(category.idCategory).to.be.a('number');
        expect(category.idCategory).to.equal(0);
    });

    it('name should be empty', function() {
        expect(category.name).to.be.a('string');
        expect(category.name).to.equal('');
    });

    it('idCategoryParent should be 0', function() {
        expect(category.idParent).to.be.a('number');
        expect(category.idParent).to.equal(0);
    });

    it('dateInsert should be null', function() {
        expect(category.createdAt).to.equal(null);
    });

    it('dateUpdate should be null', function() {
        expect(category.updatedAt).to.equal(null);
    });
});
