const {expect} = require('../common.test');
const sinon = require('sinon');
const ObjectModel = require('../../api/models/object.model');
const lodash = require('lodash');
const db = require('../../api/shared/database')

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

describe('Expect to all class properties match their type', () => {
    it('_db property should match type object', () => {
        expect(objectModel._db).that.is.a('object');
    });

    it('_lodash property should match type function', () => {
        expect(objectModel._lodash).that.is.a('function');
    });

    it('_moment property should match type function', () => {
        expect(objectModel._moment).that.is.a('function');
    });

    it('_apiErrors property should match type object', () => {
        expect(objectModel._apiErrors).that.is.a('object');
    });

    it('_primaryKey property should match type string', () => {
        expect(objectModel._primaryKey).that.is.a('string');
    });

    it('_tableName property should match type string', () => {
        expect(objectModel._tableName).that.is.a('string');
    });

    it('_dbProperties property should match type array', () => {
        expect(objectModel._dbProperties).that.is.a('array');
    });

    it('id property should match type number', () => {
        expect(objectModel.id).that.is.a('number');
    });

    it('createdAt property should match type date', () => {
        expect(objectModel.createdAt).that.is.a('date');
    });

    it('updatedAt property should match type date', () => {
        expect(objectModel.updatedAt).that.is.a('date');
    });
});

describe('_getCurrentDate', () => {

})

describe('getAll', () => {
    let query;
    let isEmpty;

    before(() => {

        // TODO
        /*query = sinon.stub(objectModel, '_db').returns(
            {
                get: () => {
                    return new Promise(resolve(
                        {
                            query: () => {
                            }
                        })
                    )
                }
            });*/
        query = sinon.stub().returns([[{}]]);
        isEmpty = sinon.stub(lodash, 'isEmpty').returns(true);
    });

    after(() => {
        objectModel._db = db;
        //query.restore();
        isEmpty.restore();
    });

    it('query function should be called', async () => {
        objectModel._db.get().query = query;
        await objectModel.getAll();
        expect(query.called).to.be.true;
    });

    it('isEmpty function should be called.', async () => {
        objectModel._lodash.isEmpty = isEmpty;
        await objectModel.getAll();
        expect(isEmpty.called).to.be.true;
    })
});