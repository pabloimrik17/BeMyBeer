const ObjectModel = require('./object.model');

const _definition = {
    primaryKey: 'idBeer',
    tableName: 'beer',
    dbProperties: [
        'idBeer',
        'name',
        'graduation',
        'color',
        'score',
        'price',
        'idCategory',
        'datePurchased',
        'dateDrinked',
        'createdAt',
        'updatedAt',
    ],
};

class Beer extends ObjectModel {
    constructor(idBeer = 0) {
        super(idBeer);
        this.idBeer = 0;
        this.name = '';
        this.graduation = 0;
        this.color = '';
        this.score = 0;
        this.price = 0;
        this.idCategory = 0;
        this.datePurchased = '';
        this.dateDrinked = null;

        if (idBeer > 0) {
            this.idBeer = idBeer
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
}

module.exports = Beer;