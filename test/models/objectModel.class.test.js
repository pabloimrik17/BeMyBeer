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

describe('Expect to have all class methods', () => {
    it('Should have a constructor', () => {
        expect(objectModel.constructor).to.exist;
    });

    it('Should have a _getCurrentDate method', () => {
        expect(objectModel._getCurrentDate).to.exist;
    });

    it('Should have a getAll method', () => {
        expect(objectModel.getAll).to.exist;
    });

    it('Should have a init method', () => {
        expect(objectModel.init).to.exist;
    });

    it('Should have a _get method', () => {
        expect(objectModel._get).to.exist;
    });

    it('Should have a getFiltered method', () => {
        expect(objectModel.getFiltered).to.exist;
    });

    it('Should have a _save method', () => {
        expect(objectModel._save).to.exist;
    });

    it('Should have a saveAndRetrieveFiltered method', () => {
        expect(objectModel.saveAndRetrieveFiltered).to.exist;
    });

    it('Should have a _update method', () => {
        expect(objectModel._update).to.exist;
    });

    it('Should have a updateAndRetrieveFiltered method', () => {
        expect(objectModel.updateAndRetrieveFiltered).to.exist;
    });

    it('Should have a delete method', () => {
        expect(objectModel.delete).to.exist;
    });

    it('Should have a _getFilteredObject method', () => {
        expect(objectModel._getFilteredObject).to.exist;
    });
});