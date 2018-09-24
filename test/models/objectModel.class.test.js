const {expect} = require('../common.test');
const ObjectModel = require('../../api/models/object.model');

let objectModel = null;

before(() => {
    objectModel = new ObjectModel();

});

after(() => {
    objectModel = null;
});

describe('Expect to have all class properties', () => {
    it('Should have _db property', () => {
        expect(objectModel).to.have.property('_db');
    });

    it('Should have _lodash property', () => {
        expect(objectModel).to.have.property('_lodash');
    });

    it('Should have _moment property', () => {
        expect(objectModel).to.have.property('_moment');
    });

    it('Should have _apiErrors property', () => {
        expect(objectModel).to.have.property('_apiErrors');
    });

    it('Should have _primaryKey property', () => {
        expect(objectModel).to.have.property('_primaryKey');
    });

    it('Should have _tableName property', () => {
        expect(objectModel).to.have.property('_tableName');
    });

    it('Should have _dbProperties property', () => {
        expect(objectModel).to.have.property('_dbProperties');
    });

    it('Should have id property', () => {
        expect(objectModel).to.have.property('id');
    });

    it('Should have createdAt property', () => {
        expect(objectModel).to.have.property('createdAt');
    });

    it('Should have updatedAt property', () => {
        expect(objectModel).to.have.property('updatedAt');
    });
});