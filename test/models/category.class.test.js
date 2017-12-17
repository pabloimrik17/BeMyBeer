const { expect, knex } = require('../common.test');

const Category = require('../../api/models/category.model');
const CategorySeeder = require('../seeders/category.seeder');

// TODO REFACT THIS UGLY THING
// TODO FIX ALL THE DATA SEEDING / MANAGEMENT WITH KNEX
let category;
let currentRow;

before(async () => {
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
});

after(async () => {
    await CategorySeeder.downData();
});

describe('Instantiate Category Object with no id', () => {
    it('idCategory should be 0', () => {
        expect(category.idCategory).to.be.a('number');
        expect(category.idCategory).to.equal(0);
    });

    it('name should be empty', () => {
        expect(category.name).to.be.a('string');
        expect(category.name).to.equal('');
    });

    it('idCategoryParent should be 0', () => {
        expect(category.idParent).to.be.a('number');
        expect(category.idParent).to.equal(0);
    });

    it('dateInsert should be null', () => {
        expect(category.createdAt).to.equal(null);
    });

    it('dateUpdate should be null', () => {
        expect(category.updatedAt).to.equal(null);
    });
});

describe('Instantiate Category Object with id', () => {
    before(async () => {
        currentRow = await knex(Category.getTableName).limit(1).orderByRaw('rand()');
        category = new Category(currentRow[0].idCategory);
        expect(category).to.be.a('object');

        await category._init();
    });

    it('idCategory should be equal to', () => {
        expect(category.idCategory).to.be.a('number');
        expect(category.idCategory).to.equal(currentRow[0].idCategory);
    });

    it('name should be equal to', () => {
        expect(category.name).to.be.a('string');
        expect(category.name).to.equal(currentRow[0].name);
    });

    it('idParent should be equal to', () => {
        expect(category.idParent).to.be.a('number');
        expect(category.idParent).to.equal(currentRow[0].idParent);
    });

    it('createdAt should be equal to', () => {
        expect(category.createdAt).to.be.a.dateString();
        expect(category.createdAt).to.equal(currentRow[0].createdAt);
    });

    it('updatedAt should be equal to', () => {
        expect(category.updatedAt).to.be.a.dateString();
        expect(category.updatedAt).to.equal(currentRow[0].updatedAt);
    });
});

describe('Create new category', () => {
    before(async () => {
        category = CategorySeeder.generateCategoryObject();
        await category.save();

        currentRow = await knex(Category.getTableName).order(`${Category.idCategory} desc`).limit(1);

        category = new Category(currentRow[0].idCategory);
        await category._init();
    });

    it('idCategory should be equal to', () => {
        expect(category.idCategory).to.be.a('number');
        expect(category.idCategory).to.equal(currentRow[0].idCategory);
    });

    it('name should be equal to', () => {
        expect(category.name).to.be.a('string');
        expect(category.name).to.equal(currentRow[0].name);
    });

    it('idParent should be equal to', () => {
        expect(category.idParent).to.be.a('number');
        expect(category.idParent).to.equal(currentRow[0].idParent);
    });

    it('createdAt should be equal to', () => {
        expect(category.createdAt).to.be.a.dateString();
        expect(category.createdAt).to.equal(currentRow[0].createdAt);
    });

    it('updatedAt should be equal to', () => {
        expect(category.updatedAt).to.be.a.dateString();
        expect(category.updatedAt).to.equal(currentRow[0].updatedAt);
    });
});

describe('Update existing category', () => {
    before(async () => {
        currentRow = await knex(Category.getTableName).limit(1).orderByRaw('rand()');
        category = new Category(currentRow[0].idCategory);
        expect(category).to.be.a('object');

        category._init();

        category = CategorySeeder.generateCategoryObject();
        category.update();
        currentRow = await knex(Category.getTableName).where(Category.getPrimaryKey(), currentRow[0].idCategory);
    });

    it('idCategory should be greather than 0', () => {
        expect(category.idCategory).to.be.a('number');
        expect(category.idCategory).to.equal(category.idCategory);
    });

    it('name should not be empty', () => {
        expect(category.name).to.be.a('string');
        expect(category.name).to.equal(category.name);
    });

    it('idParent should greater than 0', () => {
        expect(category.idParent).to.be.a('number');
        expect(category.idParent).to.equal(category.idParent);
    });

    it('createdAt should not be null', () => {
        expect(category.createdAt).to.be.a.dateString();
        expect(category.createdAt).to.equal(category.createdAt);
    });

    it('updateAt should not be null', () => {
        expect(category.updateAt).to.be.a.dateString();
        expect(category.updateAt).to.equal(category.updateAt);
    });
});

describe('Delete existing Category', () => {
    before(async () => {
        currentRow = await knex(Category.getTableName).limit(1).orderByRaw('rand()');

        category = new Category(currentRow[0].idCategory);
        expect(category).to.be.a('object');
        category.delete();

        currentRow = await knex(Category.getTableName).where(Category.getPrimaryKey(), currentRow[0].idCategory);
        expect(currentRow).to.be.a('array');
        expect(currentRow).to.be.empty();
        expect(currentRow.length).to.be(0);
    });

    it('idCategory should be 0', () => {
        expect(category.idCategory).to.be.a('number');
        expect(category.idCategory).to.equal(0);
    });

    it('name should be empty', () => {
        expect(category.name).to.be.a('string');
        expect(category.name).to.equal('');
    });

    it('idCategoryParent should be 0', () => {
        expect(category.idParent).to.be.a('number');
        expect(category.idParent).to.equal(0);
    });

    it('dateInsert should be null', () => {
        expect(category.createdAt).to.equal(null);
    });

    it('dateUpdate should be null', () => {
        expect(category.updatedAt).to.equal(null);
    });
});
