// SAMPLE MOCHA TEST

const common = require('../common');
const expect = common.expect;
const Category = require('../../api/models/category.model');

let category;

describe('Instantiate with no id', function () {
    beforeEach(() => {
        category = new Category();
    });

    it('idCategory should be 0', function () {
        expect(category.idCategory).to.be.a('number');
        expect(category.idCategory).to.equal(0);
    });

    it('name should be empty', function () {
        expect(category.name).to.be.a('string');
        expect(category.name).to.equal('');
    });

    it('idCategoryParent should be 0', function () {
        expect(category.idCategoryParent).to.be.a('number');
        expect(category.idCategoryParent).to.equal(0);
    });

    it('dateInsert should be null', function () {
        expect(category.dateInsert).to.equal(null);
    });

    it('dateUpdate should be null', function () {
        expect(category.dateUpdate).to.equal(null);
    });
});

describe('Instantiate with id', function () {
    beforeEach(() => {
        category = new Category(1);
    });

    it('idCategory should be 0', function () {
        expect(category.idCategory).to.be.a('number');
        expect(category.idCategory).to.equal(1);
    });

    it('name should be empty', function () {
        expect(category.name).to.be.a('string');
        expect(category.name).to.equal('Categoria');
    });

    it('idCategoryParent should be 0', function () {
        expect(category.idCategoryParent).to.be.a('number');
        expect(category.idCategoryParent).to.equal(0);
    });

    it('dateInsert should be null', function () {
        expect(category.dateInsert).to.equal(null);
    });

    it('dateUpdate should be null', function () {
        expect(category.dateUpdate).to.equal(null);
    });
});