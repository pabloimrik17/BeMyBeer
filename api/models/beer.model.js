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
        super(idBeer, _definition.primaryKey, _definition.tableName, _definition.dbProperties);
        this.idBeer = 0;
        this.name = '';
        this.graduation = 0.00;
        this.color = '';
        this.score = 0.00;
        this.price = 0.00;
        this.idCategory = 0;
        this.datePurchased = '';
        this.dateDrinked = null;

        if (idBeer > 0) {
            this.idBeer = idBeer;
        }
    }
}

module.exports = Beer;
