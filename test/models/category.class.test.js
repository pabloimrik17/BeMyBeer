
const common = require('../common');
const expect = common.expect;
const faker = common.faker;
const moment = common.moment;

const Category = require('../../api/models/category.model');

// TODO REFACT THIS UGLY THING
// TODO FIX ALL THE DATA SEEDING / MANAGEMENT WITH KNEX
let category;
let category2;

describe('Instantiate Category Object with no id', () => {
    before(() => {
        category = new Category();
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
        expect(category.idCategoryParent).to.be.a('number');
        expect(category.idCategoryParent).to.equal(0);
    });

    it('dateInsert should be null', () => {
        expect(category.dateInsert).to.equal(null);
    });

    it('dateUpdate should be null', () => {
        expect(category.dateUpdate).to.equal(null);
    });
});

describe('Instantiate Category Object with id', () => {
    before( async () => {
        category = new Category(1);
        await category.getOne();
    });

    it('idCategory should be greather than 0', () => {
        expect(category.idCategory).to.be.a('number');
        expect(category.idCategory).to.equal(1);
    });

    it('name should not be empty', () => {
        expect(category.name).to.be.a('string');
        expect(category.name).to.equal('Pale Ale');
    });

    it('idCategoryParent should greater than 0', () => {
        expect(category.idCategoryParent).to.be.a('number');
        expect(category.idCategoryParent).to.equal(0);
    });

    it('dateInsert should not be null', () => {
        expect(category.dateInsert).to.be.a.dateString();
        expect(category.dateInsert).to.equal('2017-12-01');
    });

    it('dateUpdate should not be null', () => {
        expect(category.dateInsert).to.be.a.dateString();
        expect(category.dateUpdate).to.equal('2017-12-01');
    });
});

describe('Create new category', () => {
    before(() => {
        category = new Category();
        category.name = faker.name.firstName();
        category.idCategoryParent = faker.random.number();
        category.dateInsert = moment(faker.date.recent(10)).format('YYYY-MM-DD');
        category.dateUpdate = moment(faker.date.recent(10)).format('YYYY-MM-DD');

        category.save();
        //TODO Fixed id category to 1 by the moment
        category2 = new Category(1);

    });

    it('idCategory should be greather than 0', () => {
        expect(category2.idCategory).to.be.a('number');
        expect(category2.idCategory).to.equal(category.idCategory);
    });

    it('name should not be empty', () => {
        expect(category2.name).to.be.a('string');
        expect(category2.name).to.equal(category.name);
    });

    it('idCategoryParent should greater than 0', () => {
        expect(category2.idCategoryParent).to.be.a('number');
        expect(category2.idCategoryParent).to.equal(category.idCategoryParent);
    });

    it('dateInsert should not be null', () => {
        expect(category2.dateInsert).to.be.a.dateString();
        expect(category2.dateInsert).to.equal(category.dateInsert);
    });

    it('dateUpdate should not be null', () => {
        expect(category2.dateInsert).to.be.a.dateString();
        expect(category2.dateUpdate).to.equal(category.dateUpdate);
    });
});

describe('Update existing category', () => {
    before(() => {
        category = new Category();
        category.name = faker.name.firstName();
        category.idCategoryParent = faker.random.number();
        category.dateInsert = moment(faker.date.recent(10)).format('YYYY-MM-DD');
        category.dateUpdate = moment(faker.date.recent(10)).format('YYYY-MM-DD');

        category.save();
        //TODO Fixed id category to 1 by the moment
        category = new Category(1);
        category.name = faker.name.firstName();
        category.idCategoryParent = faker.random.number();
        category.dateInsert = moment(faker.date.recent(10)).format('YYYY-MM-DD');
        category.dateUpdate = moment(faker.date.recent(10)).format('YYYY-MM-DD');
        category.update();

        category2 = new Category(1)

    });

    it('idCategory should be greather than 0', () => {
        expect(category2.idCategory).to.be.a('number');
        expect(category2.idCategory).to.equal(category.idCategory);
    });

    it('name should not be empty', () => {
        expect(category2.name).to.be.a('string');
        expect(category2.name).to.equal(category.name);
    });

    it('idCategoryParent should greater than 0', () => {
        expect(category2.idCategoryParent).to.be.a('number');
        expect(category2.idCategoryParent).to.equal(category.idCategoryParent);
    });

    it('dateInsert should not be null', () => {
        expect(category2.dateInsert).to.be.a.dateString();
        expect(category2.dateInsert).to.equal(category.dateInsert);
    });

    it('dateUpdate should not be null', () => {
        expect(category2.dateInsert).to.be.a.dateString();
        expect(category2.dateUpdate).to.equal(category.dateUpdate);
    });
});

describe('Delete existing Category', () =>  {
    before(() => {
        category = new Category();
        category.name = faker.name.firstName();
        category.idCategoryParent = faker.random.number();
        category.dateInsert = moment(faker.date.recent(10)).format('YYYY-MM-DD');
        category.dateUpdate = moment(faker.date.recent(10)).format('YYYY-MM-DD');

        category.save();
        category.delete();

        category = new Category(1);
    });

    it('idCategory should be greather than 0', () => {
        expect(category.idCategory).to.be.a('number');
        expect(category.idCategory).to.equal(1);
    });

    it('name should not be empty', () => {
        expect(category.name).to.be.a('string');
        expect(category.name).to.equal('Categoria');
    });

    it('idCategoryParent should greater than 0', () => {
        expect(category.idCategoryParent).to.be.a('number');
        expect(category.idCategoryParent).to.equal(0);
    });

    it('dateInsert should not be null', () => {
        expect(category.dateInsert).to.be.a.dateString();
        expect(category.dateInsert).to.equal('2017-12-01');
    });

    it('dateUpdate should not be null', () => {
        expect(category.dateInsert).to.be.a.dateString();
        expect(category.dateUpdate).to.equal('2017-12-01');
    });
});