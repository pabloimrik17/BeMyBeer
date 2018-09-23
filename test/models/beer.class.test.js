const { expect, knex, _ } = require('../common.test');

const Beer = require('../../api/models/beer.model');
const BeerSeeder = require('../seeders/beer.seeder');

let beer;
let beers;
let rows;

before(async function () {
    try {
        beer = new Beer();
        expect(beer).to.be.a('object');

        expect(Beer.getPrimaryKey).to.exist;
        expect(Beer.getTableName).to.exist;
        expect(Beer.getDbProperties).to.exist;
        expect(Beer.getOne).to.exist;
        expect(beer._get).to.exist;
        expect(beer._save).to.exist;
        expect(beer.delete).to.exist;
        expect(beer._update).to.exist;
        expect(beer.getAll).to.exist;

        expect(BeerSeeder.getTableName).to.exist;
        expect(BeerSeeder.generateCategoryObject).to.exist;
        expect(BeerSeeder.generateCategoryData).to.exist;
        expect(BeerSeeder.upData).to.exist;
        expect(BeerSeeder.downData).to.exist;

        await BeerSeeder.upData();
    } catch (e) {
        expect(e).to.be.empty;
    }
});

after(async function () {
    try {
        await CategorySeeder.downData();

    } catch (e) {
        expect(e).to.be.empty;
    }
});

describe('Instantiate Category Object with no id', function () {
    it('idCategory should be 0', function () {
        expect(beer.idBeer).to.be.a('number');
        expect(beer.idBeer).to.equal(0);
    });

    it('name should be empty', function () {
        expect(beer.name).to.be.a('string');
        expect(beer.name).to.equal('');
    });

    it('graduation should be 0', function () {
        expect(beer.graduation).to.be.a('number');
        expect(beer.graduation).to.equal(0);
    });

    it('color should be #FFF', function () {
        expect(beer.color).to.be.a('string');
        expect(beer.color).to.equal('#FFF');
    });

    it('score should be 0', function () {
        expect(beer.score).to.be.a('number');
        expect(beer.score).to.equal(0);
    });

    it('price should be 0', function () {
        expect(beer.price).to.be.a('number');
        expect(beer.price).to.equal(0);
    });

    it('idCategory should be 0', function () {
        expect(beer.idCategory).to.be.a('number');
        expect(beer.idCategory).to.equal(0);
    });

    it('purchasedAt should be null', function () {
        expect(beer.purchasedAt).to.equal(null);
    });

    it('drinkedAt should be null', function () {
        expect(beer.drinkedAt).to.equal(null);
    });

    it('createdAt should be null', function () {
        expect(beer.createdAt).to.equal(null);
    });

    it('dateUpdate should be null', function () {
        expect(beer.updatedAt).to.equal(null);
    });
});

describe('Instantiate Category Object with id', function () {
    before(async function () {
        try {
            rows = await knex(Beer.getTableName).limit(1).orderByRaw('rand()');
            beer = new Beer(rows[0].idCategory);
            expect(beer).to.be.a('object');

            await beer._get();

        } catch (e) {
            expect(e).to.be.empty;
        }
    });

    it('idBeer should be greater than 0', function () {
        expect(beer.idBeer).to.be.a('number');
        expect(beer.idBeer).to.equal(rows[0].idBeer);
    });

    it('name should not be empty', function () {
        expect(beer.name).to.be.a('string');
        expect(beer.name).to.equal(rows[0].name);
    });

    it('graduation should be greater than 0', function () {
        expect(beer.graduation).to.be.a('number');
        expect(beer.graduation).to.equal(rows[0].graduation);
    });

    it('color should be a valid hex color (#FFF)', function () {
        expect(beer.color).to.be.a('string');
        expect(beer.color).to.equal(rows[0].color);
    });

    it('score should be greater than 0', function () {
        expect(beer.score).to.be.a('number');
        expect(beer.score).to.equal(rows[0].score);
    });

    it('price should be greater than 0', function () {
        expect(beer.price).to.be.a('number');
        expect(beer.price).to.equal(rows[0].price);
    });

    it('idCategory should be greater than 0', function () {
        expect(beer.idCategory).to.be.a('number');
        expect(beer.idCategory).to.equal(rows[0].idCategory);
    });

    it('purchasedAt should not be null', function () {
        expect(beer.purchasedAt).to.be.a.dateString();
        expect(beer.purchasedAt).to.equal(rows[0].purchasedAt);
    });

    it('drinkedAt should not be null', function () {
        expect(beer.drinkedAt).to.be.a.dateString();
        expect(beer.drinkedAt).to.equal(rows[0].drinkedAt);
    });

    it('createdAt should not be null', function () {
        expect(beer.createdAt).to.be.a.dateString();
        expect(beer.createdAt).to.equal(rows[0].createdAt);
    });

    it('dateUpdate should not be null', function () {
        expect(beer.updatedAt).to.be.a.dateString();
        expect(beer.updatedAt).to.equal(rows[0].updatedAt);
    });
});

describe('Get all beers', function () {
    before(async function () {
        try {
            beer = new Beer();
            beers = await beer.getAll();

            rows = await knex(Beer.getTableName).orderBy(Beer.getPrimaryKey);
        } catch (e) {
            expect(e).to.be.empty;
        }
    });

    it('Should return some data', function () {
        expect(beers.length).to.be.greaterThan(0);
    });

    it('Should return all rows in db', function () {
        expect(beers.length).to.be.equal(rows.length);
    });

    it('Should return correct data type', function () {
        _.forEach(beers, (beer) => {
            expect(beer.idCategory).to.exist;
            expect(beer.name).to.exist;
            expect(beer.idParent).to.exist;
            expect(beer.createdAt).to.exist;
            expect(beer.updatedAt).to.exist;

            expect(beer.idCategory).to.be.a('number');
            expect(beer.name).to.be.a('string');
            expect(beer.idParent).to.be.a('number');
            expect(beer.createdAt).to.be.a.dateString();
            expect(beer.updatedAt).to.be.a.dateString();
        });
    });

    it('Should return the same data as in db', function () {
        for (let i = 0; i < beers.length; i += 1) {
            _.forOwn(beers[i], (value, key) => {
                expect(beers[i][key]).to.be.equal(rows[i][key]);
            });
        }
    });
});

describe('Create new beer', function () {
    before(async function () {
        try {
            beer = new Beer();
            BeerSeeder.generateCategoryObject(beer);
            await beer._save();

            rows = await knex(Beer.getTableName).orderBy(Beer.getPrimaryKey, 'desc').limit(1);

            beer = new Beer(rows[0].idBeer);
            await beer._get();

        } catch (e) {
            expect(e).to.be.empty;
        }
    });

    it('idBeer should be greater than 0', function () {
        expect(beer.idBeer).to.be.a('number');
        expect(beer.idBeer).to.equal(rows[0].idBeer);
    });

    it('name should not be empty', function () {
        expect(beer.name).to.be.a('string');
        expect(beer.name).to.equal(rows[0].name);
    });

    it('graduation should be greater than 0', function () {
        expect(beer.graduation).to.be.a('number');
        expect(beer.graduation).to.equal(rows[0].graduation);
    });

    it('color should be a valid hex color (#FFF)', function () {
        expect(beer.color).to.be.a('string');
        expect(beer.color).to.equal(rows[0].color);
    });

    it('score should be greater than 0', function () {
        expect(beer.score).to.be.a('number');
        expect(beer.score).to.equal(rows[0].score);
    });

    it('price should be greater than 0', function () {
        expect(beer.price).to.be.a('number');
        expect(beer.price).to.equal(rows[0].price);
    });

    it('idCategory should be greater than 0', function () {
        expect(beer.idCategory).to.be.a('number');
        expect(beer.idCategory).to.equal(rows[0].idCategory);
    });

    it('purchasedAt should not be null', function () {
        expect(beer.purchasedAt).to.be.a.dateString();
        expect(beer.purchasedAt).to.equal(rows[0].purchasedAt);
    });

    it('drinkedAt should not be null', function () {
        expect(beer.drinkedAt).to.be.a.dateString();
        expect(beer.drinkedAt).to.equal(rows[0].drinkedAt);
    });

    it('createdAt should not be null', function () {
        expect(beer.createdAt).to.be.a.dateString();
        expect(beer.createdAt).to.equal(rows[0].createdAt);
    });

    it('dateUpdate should not be null', function () {
        expect(beer.updatedAt).to.be.a.dateString();
        expect(beer.updatedAt).to.equal(rows[0].updatedAt);
    });
});

describe('Update existing beer', function () {
    before(async function () {
        try {
            rows = await knex(Beer.getTableName).limit(1).orderByRaw('rand()');
            beer = new Beer(rows[0].idBeer);
            expect(beer).to.be.a('object');

            await beer._get();

            BeerSeeder.generateCategoryObject(beer);
            await beer._update();
            rows = await knex(Beer.getTableName).where(Beer.getPrimaryKey, currentRow[0].idBeer);

        } catch (e) {
            expect(e).to.be.empty;
        }
    });

    it('idBeer should be greater than 0', function () {
        expect(beer.idBeer).to.be.a('number');
        expect(beer.idBeer).to.equal(rows[0].idBeer);
    });

    it('name should not be empty', function () {
        expect(beer.name).to.be.a('string');
        expect(beer.name).to.equal(rows[0].name);
    });

    it('graduation should be greater than 0', function () {
        expect(beer.graduation).to.be.a('number');
        expect(beer.graduation).to.equal(rows[0].graduation);
    });

    it('color should be a valid hex color (#FFF)', function () {
        expect(beer.color).to.be.a('string');
        expect(beer.color).to.equal(rows[0].color);
    });

    it('score should be greater than 0', function () {
        expect(beer.score).to.be.a('number');
        expect(beer.score).to.equal(rows[0].score);
    });

    it('price should be greater than 0', function () {
        expect(beer.price).to.be.a('number');
        expect(beer.price).to.equal(rows[0].price);
    });

    it('idCategory should be greater than 0', function () {
        expect(beer.idCategory).to.be.a('number');
        expect(beer.idCategory).to.equal(rows[0].idCategory);
    });

    it('purchasedAt should not be null', function () {
        expect(beer.purchasedAt).to.be.a.dateString();
        expect(beer.purchasedAt).to.equal(rows[0].purchasedAt);
    });

    it('drinkedAt should not be null', function () {
        expect(beer.drinkedAt).to.be.a.dateString();
        expect(beer.drinkedAt).to.equal(rows[0].drinkedAt);
    });

    it('createdAt should not be null', function () {
        expect(beer.createdAt).to.be.a.dateString();
        expect(beer.createdAt).to.equal(rows[0].createdAt);
    });

    it('dateUpdate should not be null', function () {
        expect(beer.updatedAt).to.be.a.dateString();
        expect(beer.updatedAt).to.equal(rows[0].updatedAt);
    });
});

describe('Delete existing beer', function () {
    before(async function () {
        try {
            rows = await knex(Beer.getTableName).limit(1).orderByRaw('rand()');

            beer = new Beer(rows[0].idBeer);
            expect(beer).to.be.a('object');
            await beer.delete();

            rows = await knex(Beer.getTableName).where(Beer.getPrimaryKey, rows[0].idBeer);
            expect(rows).to.be.a('array');
            expect(rows).to.be.empty;
            expect(rows.length).to.equal(0);

        } catch (e) {
            expect(e).to.be.empty;
        }
    });

    it('idCategory should be 0', function () {
        expect(beer.idBeer).to.be.a('number');
        expect(beer.idBeer).to.equal(0);
    });

    it('name should be empty', function () {
        expect(beer.name).to.be.a('string');
        expect(beer.name).to.equal('');
    });

    it('graduation should be 0', function () {
        expect(beer.graduation).to.be.a('number');
        expect(beer.graduation).to.equal(0);
    });

    it('color should be #FFF', function () {
        expect(beer.color).to.be.a('string');
        expect(beer.color).to.equal('#FFF');
    });

    it('score should be 0', function () {
        expect(beer.score).to.be.a('number');
        expect(beer.score).to.equal(0);
    });

    it('price should be 0', function () {
        expect(beer.price).to.be.a('number');
        expect(beer.price).to.equal(0);
    });

    it('idCategory should be 0', function () {
        expect(beer.idCategory).to.be.a('number');
        expect(beer.idCategory).to.equal(0);
    });

    it('purchasedAt should be null', function () {
        expect(beer.purchasedAt).to.equal(null);
    });

    it('drinkedAt should be null', function () {
        expect(beer.drinkedAt).to.equal(null);
    });

    it('createdAt should be null', function () {
        expect(beer.createdAt).to.equal(null);
    });

    it('dateUpdate should be null', function () {
        expect(beer.updatedAt).to.equal(null);
    });
});